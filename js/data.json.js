(function(exports) {
  var GSA = exports.GSA || (exports.GSA = {});

  GSA.dataDotJSON = {

    init: function(options) {
      GSA.dataDotJSON.display(options);
    },

    display: function(options) {
      var url = options.url,
          root = $(options.container);

      if (!url) {
        throw new Error("you must provide a 'url' in options");
      }
      if (!root.length) {
        throw new Error("no such container: '" + options.container + "'");
      }

      $.getJSON(url, function(data) {

        var themes = [],
            entriesByTheme = {},
            links = $("<ul>")
              .addClass("themes")
              .appendTo(root);

        // create an entry for each data object from 
        $.each(data, function(i, d) {
          // create some HTML from the "entry" template
          var entry = GSA.dataDotJSON.template("entry", d),
              theme = d.theme[0];
          // if we've seen this theme before...
          if (theme in entriesByTheme) {
            // push the entry onto its list
            entriesByTheme[theme].push(entry);
          } else {
            // otherwise, push the theme to the list and create its
            // corresponding entries list
            themes.push(theme);
            entriesByTheme[theme] = [entry];
          }
        });

        // sort themes alphabetically
        themes.sort(function(a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        // now, do some stuff for each theme
        $.each(themes, function(i, theme) {
          // create a link for the theme, and add it to the links list
          var link = $("<li>")
            .html(GSA.dataDotJSON.template("theme_link", {theme: theme}))
            .appendTo(links);

          // render the "theme" template and add that bit to the root
          var html = GSA.dataDotJSON.template("theme", {theme: theme});
          root.append(html);

          // then add each of its entries
          $.each(entriesByTheme[theme], function(j, entry) {
            root.append(entry);
          });
        });

      });
    },

    template: function(template, data) {
      if (template in this.templates) {
        template = this.templates[template];
      }
      return template.replace(/{{(\w+)}}/g, function(_, key) {
        return data[key] || "";
      });
    },

    templates: {
        entry: '<div class="entry"><h4><a href="{{accessURL}}" target"_blank">{{title}}</a></h4><p>{{description}}</p><br></div>',
        theme: '<h3 id="theme-{{theme}}">{{theme}}</h3><hr>',
        theme_link: '<li><a href="#theme-{{theme}}">{{theme}}</a></li>',
        staging: '<strong>[Note: This data is dynamic, and not available in the Staging environment. It can be viewed in Production: <a href="http://gsa.gov/portal/content/181595">http://gsa.gov/portal/content/181595</a>.]</strong><br><br>',
    }
  };

})(this);

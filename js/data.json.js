(function(exports) {
  var GSA = exports.GSA || (exports.GSA = {});

  GSA.dataDotJSON = {

    init: function(options) {
      GSA.dataDotJSON.display(options);
    },

    display: function(options) {
      var url = options.url;
      var root = $(options.container);

      if (!url) {
        throw new Error("you must provide a 'url' in options");
      }
      if (!root.length) {
        throw new Error("no such container: '" + options.container + "'");
      }

      $.getJSON(url, function(data) {

        var themes = [];
        var entriesByTheme = {};
        var links = $("<ul>")
          .addClass("themes")
          .appendTo(root);
        var datasets = data.dataset || data;

        // create an entry for each data object from 
        $.each(datasets, function(i, d) {

          if (!d.url) d.url = GSA.dataDotJSON.getDatasetURL(d);
          if (!d.url) return; // don't list entries without a URL!

          // create some HTML from the "entry" template
          var entry = GSA.dataDotJSON.template("entry", d);
          var theme = d.theme[0];
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

    /*
     * This function actuall has a side-effect: the dataset object's
     * "urlType" property is set so that the template can use it
     * later. We search the `distribution` array (if there is one)
     * and look for an `accessURL` first, then for a `downloadURL`,
     * and return whichever of those is found (with a preference for
     * `accessURL`). Otherwise, returns `null`.
     */
    getDatasetURL: function(dataset) {
      var dist = dataset.distribution;
      if (!dist) return null;
      var len = dist.length;
      var i = 0;
      var d;
      for (i = 0; i < len; i++) {
        d = dist[i];
        if (d.accessURL) {
          dataset.urlType = 'access';
          return d.accessURL;
        }
      }
      for (i = 0; i < len; i++) {
        d = dist[i];
        if (d.downloadURL) {
          dataset.urlType = 'download';
          return d.downloadURL;
        }
      }
      return null;
    },

    // a very quick and dirty Handlebars-like template generator
    template: function(template, data) {
      if (template in this.templates) {
        template = this.templates[template];
      }
      return template.replace(/{{\s*(\w+)\s*}}/g, function(_, key) {
        return data[key] || "";
      });
    },

    // content templates
    templates: {
      entry: '<div class="entry"><h4><a href="{{ url }}" class="{{ urlType }}" target"_blank">{{ title }}</a></h4><p>{{ description }}</p><br></div>',
      theme: '<h3 id="theme-{{ theme }}">{{ theme }}</h3>',
      theme_link: '<li><a href="#theme-{{ theme }}">{{ theme }}</a></li>',
      staging: '<strong>[Note: This data is dynamic, and not available in the Staging environment. It can be viewed in Production: <a href="http://gsa.gov/portal/content/181595">http://gsa.gov/portal/content/181595</a>.]</strong><br><br>',
    }
  };

})(this);

---
layout: page
title: "Open Government Plan | 6.4 Electronic Records Archives"
permalink: /erecordsarchives/
description: ""
---

#### 6.4 Electronic Records Archives




<p>(<a href="http://www.archives.gov/era/">Archives.gov/era/</a>)<br />
Electronic Records Archives (ERA) is a complex information management system that was developed to archive the variety of electronic records that the government currently produces. ERA is designed to support access by authorized users within NARA and across the federal government, as well as provide public access to releasable records. The continued existence of ERA is crucial to open government because it will provide long-term preservation and access to electronic records.</p>

<img src="../assets/images/erecords.png" alt="System to system diagram" style="max-width:400px;" class="imgright">
<p>ERA is a “system of systems,” with multiple components that perform archival functions and manage records governed by different legal frameworks. The complexity of ERA architecture is simplified by this diagram, which shows the four essential functions that ERA performs.</p>

<ul>
  <li>Government agencies use the Submission function to deliver records and metadata into the federal instance of ERA</li>
  <li>Electronic records are preserved and reviewed in the Repository</li>
  <li>The National Archives’ knowledge of what those historically valuable records are, who created them and why, and what processes have been applied to them is all documented in the Metadata</li>
  <li>The public uses the National Archives Catalog to research public releasable records</li>
</ul>

<p>ERA is a continuous state of improvement, as new tools are added to handle the variety of records and formats coming to NARA. NARA is currently building ERA 2.0, using an agile development approach. User Stories are documented, taking the place of a massive list of fixed requirements, and development takes place in four week sprints, producing working code that the staff can see and provide feedback on every month. The User Stories provide implementation guidance and acceptance criteria for the functional requirements, and each four week sprint both closes stories and surfaces requirements for new stories. The process leverages work done to date, but is more transparent than in the past, and provides for a much greater level of participation for NARA staff to guide the development.</p>

<p>NARA is taking a modular approach in modernizing ERA in an effort to reduce overall complexity of the system and meet ever-changing federal electronic record management requirements.&nbsp; The system will be comprised of three modules. The Digital Processing Environment (DPE) in ERA 2.0 supports the ingest process, and provides the software tools and metadata editing capabilities necessary for electronic records verification and processing functions, where tools can be swapped in and out as needs change. The initial implementation is scoped to include approximately fifteen tools, both embedded thin client as well as thick client tools accessed through virtual machines provided for each processing archivist. Initial tools include those for format characterization, bulk file reformatting, image manipulation, common business productivity software, PII recognition, and redaction. A tool management framework has already been built to allow the simple addition and substitution of tools, and to support multiple VM workbench images for specialized needs such as textual processing versus video or audio processing.</p>

<p>The long-term storage, search and retrieval capabilities for electronic records, once they have been processed and verified in the DPE, will be provided by a Digital Object Repository (DOR) component of ERA. DOR will provide all holdings management and preservation functions, including recording of fixities, object versioning, search, auditing, and reporting. When additional processing is needed, such as bulk preservation actions or creation of new public use versions of records to meet researcher requests, files are copied into the DPE environment for the work to take place, then versioned back into the DOR. DOR maintains the audit trail for all actions performed automatically or manually in its data warehouse.</p>

<p>Lastly, the current online forms and approval workflows for the scheduling and both physical and legal transfer of government records to NARA will be provided by the Business Object Management (BOM) component of ERA.&nbsp; The current system includes only a single workflow for federal records that excludes other record types; ERA 2.0 will comprise multiple workflows for federal, Presidential, legislative and judicial records, digitized analog records, and donated materials, with a mechanism to easily update workflows or instantiate new workflows as requirements change.</p>

<p>Each module—DPE, DOR, and BOM—is an independent codebase and not a monolithic system. The implementation is a custom Java application but leverages open source tools in the stack and will, at least for unclassified records, be cloud-based. Government agencies are increasingly managing their electronic records in the cloud, and NARA would like to be able to take advantage of a “Data at Rest” concept where records in the cloud do not need to be repeatedly moved to come under NARA control, be processed, or made accessible—the National Archives Catalog is already a cloud-based service. Given the scale projections for the transfer of electronic records to NARA and the digitization of analog records, the elasticity of the cloud is a must for the review and processing of records. Processing archivists will be working entirely in the cloud, utilizing embedded tools for bulk actions such as format characterization and reformatting, and working in virtualized workbenches directly on the files in the cloud to take advantage of elastic compute capabilities.&nbsp;</p>

<p>While public access to records is enabled through the National Archives Catalog, the DOR will include advanced search functions for staff of both metadata and record content. This will support highly granular search and review requirements to find sensitive content and review information when searching for records responsive to FOIA or other researcher access requests.</p>

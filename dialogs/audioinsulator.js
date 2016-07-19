/* eslint-disable no-undef */

CKEDITOR.dialog.add('audioinsulator', function () {
	return {
		title: 'Edit Audio Tag',
		minWidth: 400,
		minHeight: 344,
		contents: [
			{
				id: 'info',
				label: 'Audio Settings',
				elements: [
					{
						id: 'header',
						type: 'text',
						label: 'Header',

						setup: function (widget) {
							this.setValue(widget.data.header);
						},
						commit: function (widget) {
							widget.setData('header', this.getValue());
						}
					},
					{
						id: 'source',
						type: 'textarea',
						label: 'Link to MP3 Audio',

						setup: function (widget) {
							this.setValue(widget.data.source);
						},
						commit: function (widget) {
							widget.setData('source', this.getValue());
						}
					},
					{
						id: 'caption',
						type: 'text',
						label: 'Caption',

						setup: function (widget) {
							this.setValue(widget.data.caption);
						},
						commit: function (widget) {
							widget.setData('caption', this.getValue() || ' ');
						}
					},
					{
						id: 'credit',
						type: 'text',
						label: 'Credit or Copyright',

						setup: function (widget) {
							this.setValue(widget.data.credit);
						},
						commit: function (widget) {
							widget.setData('credit', this.getValue() || ' ');
						}
					}
				]
			}, {
				type : 'hbox',
				id : "upload",
				hidden : false,
				filebrowser : "uploadButton",
				label : 'Upload',
				elements: [
					{
						type : "file",
						id : "upload",
						style : "height:40px"
					},
					{
						type : "fileButton",
						id : "uploadButton",
						filebrowser : "info:source",
						label : 'Upload',
						for : ["Upload", "upload"]
					}
				]
			}
		]
	};
});

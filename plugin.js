/* eslint-disable no-undef */

// Use forceSimpleAmpersand to keep CKEditor
// from changing `&amp;` to `&amp;amp` when
// accepting the mp3 audio link.
CKEDITOR.config.forceSimpleAmpersand = true;
CKEDITOR.config.allowedContent = true;

CKEDITOR.plugins.add('audioinsulator', {
	requires: 'widget',
	icons: 'audioinsulator',
	init: function (editor) {
		var _editables = {
			header: {
				selector: 'span.ain-header'
			},
			source: {
				selector: 'source',
				allowedContent: 'source(*){*}[*];'
			},
			caption: {
				selector: 'div.ain-caption'
			},
			credit: {
				selector: 'div.ain-credit'
			}
		};

		CKEDITOR.dialog.add('audioinsulator', this.path + 'dialogs/audioinsulator.js');

		editor.addContentsCss(this.path + 'css/styles.css');

		editor.widgets.add('audioinsulator', {
			dialog: 'audioinsulator',
			button: 'Insert Audio Tag',

			allowedContent: 'div[*]{*}(*); p{*}[*](*) span[*]{*}(*); audio(*)[*]{*}; source[*](*){*}; h4',

			requiredContent: 'div(!audioinsulator)',

			template: '<div class="audioinsulator">' +
			'<h4><span class="ain-header"></span></h4>' +
			'<audio class="ain-audio" controls=""><source src="" type="audio/mpeg">Your browser does not support the audio element.</audio>' +
			'<div class="ain-caption"></div>' +
			'<div class="ain-credit"></div>' +
			'</div>',

			editables: _editables,

			// convert pasted/generated markup into this widget
			// like the output from: github.com/radiovisual/ckeditor-mediaboxconvert
			upcast: function (element) {
				return element.name === 'div' && element.hasClass('audioinsulator');
			},

			// the parts of the template we want to edit via the dialog
			parts: {
				header: _editables.header.selector,
				source: _editables.source.selector,
				caption: _editables.caption.selector,
				credit: _editables.credit.selector
			},

			init: function () {
				this.setData('source', this.parts.source.getAttribute('src'));
				this.setData('credit', this.parts.credit.getText());
				this.setData('header', this.parts.header.getText());
				this.setData('caption', this.parts.caption.getText());
			},

			data: function (widget) {
				this.parts.source.setAttribute('src', decodeURIComponent(widget.data.source));
				this.parts.header.setHtml(widget.data.header);
				this.parts.caption.setHtml(widget.data.caption);
				this.parts.credit.setHtml(widget.data.credit);
			}
		});
	}
});

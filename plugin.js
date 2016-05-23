/* eslint-disable no-undef */

CKEDITOR.plugins.add('audioinsulator', {
	requires: 'widget',
	icons: 'audioinsulator',
	init: function (editor) {
		var _editables = {
			source: {
				selector: 'source',
				allowedContent: 'source(*){*}[*];'
			},
			caption: {
				selector: 'span.ain-caption'
			},
			credit: {
				selector: 'span.ain-credit'
			}
		};

		CKEDITOR.dialog.add('audioinsulator', this.path + 'dialogs/audioinsulator.js');

		editor.addContentsCss(this.path + 'css/styles.css');

		editor.widgets.add('audioinsulator', {
			dialog: 'audioinsulator',
			button: 'Insert Audio Tag',

			template: '<div class="audioinsulator">' +
			'<audio class="ain-audio" controls=""><source src="" type="audio/mpeg">Your browser does not support the audio element.</audio>' +
			'<div class="caption_credit"><p><span class="ain-caption"></span> <span class="ain-credit"></span></p></div>' +
			'</div>',

			editables: _editables,

			allowedContent: 'div[*]{*}(*); span(*)[*]{*}; audio[*](*){*}; source(*){*}[*]; p[*](*){*}',

			requiredContent: 'div(!audioinsulator)',

			// convert pasted/generated markup into this widget
			// like the output from: github.com/radiovisual/ckeditor-mediaboxconvert
			upcast: function (element) {
				return element.name === 'div' && element.hasClass('audioinsulator');
			},

			// the parts of the template we want to edit via the dialog
			parts: {
				source: _editables.source.selector,
				caption: _editables.caption.selector,
				credit: _editables.credit.selector
			},

			init: function () {
				this.setData('source', this.parts.source.getAttribute('src'));
				this.setData('credit', this.parts.credit.getText() || '');
				this.setData('caption', this.parts.caption.getText() || '');
			},

			data: function (widget) {
				this.parts.source.setAttribute('src', widget.data.source);
				this.parts.caption.setHtml(widget.data.caption);
				this.parts.credit.setHtml(widget.data.credit);
			}
		});
	}
});

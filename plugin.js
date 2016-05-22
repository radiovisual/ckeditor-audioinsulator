/* global CKEDITOR */
/* eslint-disable new-cap  */

// Force required settings on your CKEditor environment
// This should normally be done in your own configuration file
CKEDITOR.config.allowedContent = true;
CKEDITOR.title = false;
CKEDITOR.config.enterMode = 2;
CKEDITOR.config.removePlugins = 'iframe,div,stylesheetparser';

(function () {
	CKEDITOR.plugins.add('audioinsulator', {
		// Translations, available at the end of this file, without extra requests
		lang: ['en', 'fr'],
		icons: 'audioinsulator',
		getPlaceholderCss: function () {
			return 'img.cke_audio' +
				'{' +
				'background-image: url(' + CKEDITOR.getUrl(this.path + 'images/placeholder.png') + ');' +
				'background-position: center center;' +
				'background-repeat: no-repeat;' +
				'background-color:gray;' +
				'border: 1px solid #a9a9a9;' +
				'width: 160px;' +
				'height: 40px;' +
				'}';
		},

		onLoad: function () {
			// v4
			if (CKEDITOR.addCss) {
				CKEDITOR.addCss(this.getPlaceholderCss());
			}
		},
		init: function (editor) {
			var lang = editor.lang.audioinsulator;

			// Check for CKEditor 3.5
			if (typeof editor.element.data === 'undefined') {
				console.error('The "audioinsulator" plugin requires CKEditor 3.5 or newer');
				return;
			}

			CKEDITOR.dialog.add('audioinsulator', this.path + 'dialogs/audioinsulator.js');

			editor.addCommand('audioinsulator', new CKEDITOR.dialogCommand('audioinsulator', {
				allowedContent: 'div{*}(*); audio(*){*}[*]; img(*){*}[*]; p(*){*}[*]; source(*){*}[*]'
			}));

			// for debugging purposes.
			editor.on('instanceReady', function() {
				// console.log('allowedContent (audioinsulator)', editor.filter.allowedContent);
			});

			editor.ui.addButton('Audioinsulator', {
				label: lang.toolbar,
				command: 'audioinsulator',
				toolbar: 'insert',
				icon: this.path + 'icons/audioinsulator.png'
			});

			// v3
			if (editor.addCss) {
				editor.addCss(this.getPlaceholderCss());
			}

			// If the "menu" plugin is loaded, register the menu items.
			if (editor.addMenuItems) {
				editor.addMenuItems({
					audio: {
						label: lang.properties,
						command: 'audioinsulator',
						group: 'flash'
					}
				});
			}

			editor.on('doubleclick', function (evt) {
				var element = evt.data.element;

				if (element.is('img') && element.data('cke-real-element-type') === 'audio') {
					evt.data.dialog = 'audio';
				}
			});

			// If the "contextmenu" plugin is loaded, register the listeners.
			if (editor.contextMenu) {
				editor.contextMenu.addListener(function (element) {
					if (element && element.is('img') && !element.isReadOnly() && element.data('cke-real-element-type') === 'audio') {
						return {audioinsulatorItem: CKEDITOR.TRISTATE_OFF};
					}
				});
			}

			// Add special handling for these items
			CKEDITOR.dtd.$empty['cke:source'] = 1;
			CKEDITOR.dtd.$empty.source = 1;

			editor.lang.fakeobjects.audio = lang.fakeObject;
		},

		afterInit: function (editor) {
			var dataProcessor = editor.dataProcessor;
			var dataFilter = dataProcessor && dataProcessor.dataFilter;

			// dataFilter : conversion from html input to internal data
			dataFilter.addRules({
				elements: {
					$: function (realElement) {
						if (realElement.name === 'audio') {
							realElement.name = 'cke:audio';
							for (var i = 0; i < realElement.children.length; i++) {
								if (realElement.children[i].name === 'source') {
									realElement.children[i].name = 'cke:source';
								}
							}
							return editor.createFakeParserElement(realElement, 'cke_audio', 'audio', false);
						}
					}
				}
			});
		}
	});

	// plugins.add
	var en = {
		toolbar: 'Audio',
		dialogTitle: 'Audio properties',
		fakeObject: 'Audio',
		properties: 'Edit audio',
		sourceAudio: 'Link to MP3 Audio File',
		sourceType: 'Audio type',
		linkTemplate: '<a href="%src%">%type%</a> ',
		fallbackTemplate: 'Your browser doesn\'t support audio.<br>Please download the file: %links%',
		mainTabTitle: 'Insert',
		uploadTabTitle: 'Upload'
	};

	var fr = {
		toolbar: 'Audio',
		dialogTitle: 'Propriétés du son',
		fakeObject: 'Audio',
		properties: 'Edition du son',
		sourceAudio: 'Source du son',
		sourceType: 'Type',
		linkTemplate: '<a href="%src%">%type%</a> ',
		fallbackTemplate: 'Votre navigateur ne supporte pas la balise audio.<br>Merci, de télécharger le fichier: %links%',
		mainTabTitle: 'Insérer',
		uploadTabTitle: 'Télécharger'
	};

	// v3
	if (CKEDITOR.skins) {
		en = {audio: en};
		fr = {audio: fr};
	}

	// Translations
	CKEDITOR.plugins.setLang('audioinsulator', 'en', en);
	CKEDITOR.plugins.setLang('audioinsulator', 'fr', fr);
})();

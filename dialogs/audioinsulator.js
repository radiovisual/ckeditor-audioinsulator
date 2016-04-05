/* global CKEDITOR */
/* eslint-disable new-cap */

CKEDITOR.dialog.add('audioinsulator', function (editor) {
	var lang = editor.lang.audioinsulator;

	function commitValue(audioNode) {
		var value = this.getValue();

		if (!value && this.id === 'id') {
			value = generateId();
		}

		audioNode.setAttribute(this.id, value);

		if (!value) {
			return;
		}
	}

	function commitSrc(audioNode, extraStyles, audios) {
		var match = this.id.match(/(\w+)(\d)/);
		var id = match[1];
		var number = parseInt(match[2], 10);

		var audio = audios[number] || (audios[number] = {});
		audio[id] = this.getValue();
	}

	function commitBool(audioNode) {
		var value = this.getValue();
		if (value === 'false') {
			audioNode.removeAttribute(this.id);
		} else {
			audioNode.setAttribute(this.id, value);
		}
		if (!value) {
			return;
		}
	}

	function loadValue(audioNode) {
		if (audioNode) {
			this.setValue(audioNode.getAttribute(this.id));
		} else if (this.id === 'id') {
			this.setValue(generateId());
		}
	}

	function loadSrc(audioNode, audios) {
		var match = this.id.match(/(\w+)(\d)/);
		var id = match[1];
		var number = parseInt(match[2], 10);

		var audio = audios[number];
		if (!audio) {
			return;
		}
		this.setValue(audio[id]);
	}

	function loadBool(audioNode) {
		if (audioNode) {
			if (audioNode.getAttribute(this.id)) {
				this.setValue(audioNode.getAttribute(this.id));
			} else {
				this.setValue('false');
			}
		}
	}

	function generateId() {
		var now = new Date();
		return 'audio' + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
	}

	// To automatically get the dimensions of the poster image
	var onImgLoadEvent = function () {
		// Image is ready.
		var preview = this.previewImage;
		preview.removeListener('load', onImgLoadEvent);
		preview.removeListener('error', onImgLoadErrorEvent); // eslint-disable-line  no-use-before-define
		preview.removeListener('abort', onImgLoadErrorEvent); // eslint-disable-line  no-use-before-define
	};

	var onImgLoadErrorEvent = function () {
		// Error. Image is not loaded.
		var preview = this.previewImage;
		preview.removeListener('load', onImgLoadEvent);
		preview.removeListener('error', onImgLoadErrorEvent);
		preview.removeListener('abort', onImgLoadErrorEvent);
	};

	return {
		title: lang.dialogTitle,
		minWidth: 400,
		minHeight: 200,

		onShow: function () {
			// Clear previously saved elements.
			this.fakeImage = this.audioNode = null;
			// To get dimensions of poster image
			this.previewImage = editor.document.createElement('img');

			var fakeImage = this.getSelectedElement();
			if (fakeImage && fakeImage.data('cke-real-element-type') && fakeImage.data('cke-real-element-type') === 'audio') {
				this.fakeImage = fakeImage;

				var audioNode = editor.restoreRealElement(fakeImage);
				var audios = [];
				var sourceList = audioNode.getElementsByTag('source', '');

				if (sourceList.count() === 0) {
					sourceList = audioNode.getElementsByTag('source', 'cke');
				}

				for (var i = 0, length = sourceList.count(); i < length; i++) {
					var item = sourceList.getItem(i);
					audios.push({src: item.getAttribute('src'), type: item.getAttribute('type')});
				}

				this.audioNode = audioNode;

				this.setupContent(audioNode, audios);
			} else {
				this.setupContent(null, []);
			}
		},

		onOk: function () {
			// If there's no selected element create one. Otherwise, reuse it
			var audioNode = null;
			if (this.fakeImage) {
				audioNode = this.audioNode;
			} else {
				audioNode = CKEDITOR.dom.element.createFromHtml('<cke:audio></cke:audio>', editor.document);
				audioNode.setAttributes({
					controls: 'controls'
				});
			}

			var extraStyles = {};
			var audios = [];
			this.commitContent(audioNode, extraStyles, audios);

			var innerHtml = '';
			var links = '';
			var link = lang.linkTemplate || '';

			for (var i = 0; i < audios.length; i++) {
				var audio = audios[i];
				if (!audio || !audio.src) {
					continue;
				}
				innerHtml += '<cke:source src="' + audio.src + '" type="' + audio.type + '" />';
				links += link.replace('%src%', audio.src).replace('%type%', audio.type);
			}
			audioNode.setHtml(innerHtml);

			// Refresh the fake image.
			var newFakeImage = editor.createFakeElement(audioNode, 'cke_audio', 'audio', false);
			newFakeImage.setStyles(extraStyles);
			if (this.fakeImage) {
				newFakeImage.replace(this.fakeImage);
				editor.getSelection().selectElement(newFakeImage);
			} else {
				editor.insertElement(newFakeImage);
			}
		},
		onHide: function () {
			if (this.previewImage) {
				this.previewImage.removeListener('load', onImgLoadEvent);
				this.previewImage.removeListener('error', onImgLoadErrorEvent);
				this.previewImage.removeListener('abort', onImgLoadErrorEvent);
				this.previewImage.remove();

				// Dialog is closed.
				this.previewImage = null;
			}
		},

		contents: [
			{
				label: lang.mainTabTitle,
				id: 'info',
				elements: [{
					type: 'hbox',
					widths: ['100%'],
					children: [{
						type: 'text',
						id: 'id',
						label: 'Id',
						commit: commitValue,
						setup: loadValue
					}]
				}, {
					type: 'hbox',
					widths: ['', '100px', '75px'],
					children: [{
						type: 'text',
						id: 'src0',
						label: lang.sourceAudio,
						commit: commitSrc,
						setup: loadSrc
					}, {
						type: 'button',
						id: 'browse',
						hidden: 'true',
						style: 'display:inline-block;margin-top:10px;',
						filebrowser: {
							action: 'Browse',
							target: 'info:src0',
							url: editor.config.filebrowserAudioBrowseUrl || editor.config.filebrowserBrowseUrl
						},
						label: editor.lang.common.browseServer
					}, {
						id: 'type0',
						label: lang.sourceType,
						type: 'select',
						default: 'audio/mpeg',
						items: [
							['mp3', 'audio/mpeg'],
							['wav', 'audio/wav']
						],
						commit: commitSrc,
						setup: loadSrc
					}]
				}, {
					type: 'hbox',
					widths: ['', '', '80%'],
					children: [{
						type: 'select',
						id: 'autoplay',
						label: 'Autoplay',
						default: 'autoplay',
						items: [
							['Yes', 'autoplay'],
							['No', 'false']
						],
						commit: commitBool,
						setup: loadBool
					}, {
						type: 'select',
						id: 'loop',
						label: 'Loop',
						default: 'loop',
						items: [
							['Yes', 'loop'],
							['No', 'false']
						],
						commit: commitBool,
						setup: loadBool
					}, {
						type: 'select',
						id: 'controls',
						label: 'Controls',
						default: 'controls',
						items: [
							['Active', 'controls'],
							['Hidden', 'false']
						],
						commit: commitBool,
						setup: loadBool
					}
					]
				}
				]
			}, {
				type: 'hbox',
				id: "Upload",
				hidden: true,
				filebrowser: "uploadButton",
				label: lang.uploadTabTitle,
				elements: [{
					type: "file",
					id: "upload",
					style: "height:40px"
				}, {
					type: "fileButton",
					id: "uploadButton",
					filebrowser: "info:src0",
					label: lang.uploadTabTitle,
					for: ["Upload", "upload"]
				}
				]
			}
		]
	};
});

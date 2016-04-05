# ckeditor-audioinsulator

> Embed contextMenu/metadata-friendly audio tags into CKEditor.


**Tip:** This plugin works seamlessly with [ckeditor-metadata](https://github.com/radiovisual/ckeditor-metadata).

## Installation

**Step 1:** Copy the metadata plugin files to your CKEditor's plugin folder:
```
ckeditor/plugins/
```

**Step 2:** Add the plugin to the CKEDITOR configuration:
```js
CKEDITOR.config.extraPlugins = 'audioinsulator';
```

**Step 3:** Ensure that this plugin can create content:
```js
CKEDITOR.config.allowedContent = true;
```

## Usage

Once installed, you can use the new Embed Audio button in the Insert toolbar

![toolbar screenshot](media/screenshot-toolbar.png)

This will let you embed an audio tag into the editor.

## Prior Art

This plugin is a stripped-down version of [ckeditor-audio-plugin](https://github.com/harentius/ckeditor-audio-plugin), which is a fork of [aemr3/cke_audio](https://github.com/aemr3/cke_audio), which is a fork of [Philalawst/cke_audio](https://github.com/Philalawst/cke_audio), which was based off of the CKEditor Video plugin.  

## License

MIT @ [Michael Wuergler](http://numetriclabs.com)

# ckeditor-audioinsulator

> Embed contextMenu/metadata-friendly audio tags into CKEditor.

**Tip:** This plugin works seamlessly with [ckeditor-metadata](https://github.com/radiovisual/ckeditor-metadata).

This plugin only supports links to mp3 files (because mp3 has the best browser support). If you want more features or support, try [ckeditor-audio-plugin](https://github.com/harentius/ckeditor-audio-plugin). 

## Installation

**Step 1:** Copy the audioinsulator plugin files to your CKEditor's plugin folder:
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

## Output

This plugin will output HTML with the following format:

```html
<div class="audioinsulator">
    <audio class="ain-audio" controls=""><source src="" type="audio/mpeg">Your browser does not support the audio element.</audio>
    <div class="caption_credit">
        <p>
            <span class="ain-caption"></span> <span class="ain-credit"></span>
        </p>
    </div>
</div>
```

## Prior Art

This plugin is a specialized, stripped-down version of [harentius/ckeditor-audio-plugin](https://github.com/harentius/ckeditor-audio-plugin), which is a fork of [aemr3/cke_audio](https://github.com/aemr3/cke_audio), which is a fork of [Philalawst/cke_audio](https://github.com/Philalawst/cke_audio), which was based off of the CKEditor Video plugin created by Alfonso Martínez de Lizarrondo.  

## Related

- [ckeditor-metadata](https://github.com/radiovisual/ckeditor-metadata)
- [ckeditor-iframeinsulator](https://github.com/radiovisual/ckeditor-iframeinsulator)

## License

MIT @ [Michael Wuergler](http://numetriclabs.com)

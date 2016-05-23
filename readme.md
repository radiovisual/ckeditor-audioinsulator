# ckeditor-audioinsulator

> Embed audio tags with a header, caption and credit into CKEditor.

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

Once installed, you can use the *Insert Audio Tag* button in the Insert toolbar

![toolbar screenshot](media/screenshot-toolbar.png)

This will let you embed an audio tag into the editor by supplying the .mp3 audio file, and an optional caption and credit.

## Output

This plugin will output HTML with the following format:

```html
<div class="audioinsulator">
    <h4><span class="ain-header"></span></h4>
    <audio class="ain-audio" controls=""><source src="" type="audio/mpeg">Your browser does not support the audio element.</audio>
    <div class="caption_credit">
        <p>
            <span class="ain-caption"></span> <span class="ain-credit"></span>
        </p>
    </div>
</div>
```

**Note:** This might look strange `<h4><span class="ain-header"></span></h4>` (embedding `span` tags within the `h4` tag),
but this is done in concert with `h4 { user-select:none; }` to force CKEditor users to use the widget dialog to update the
text instead of editing inline. I made this choice to get around some quirky behaviors of the CKEditor widget component. 


## Related

- [ckeditor-metadata](https://github.com/radiovisual/ckeditor-metadata)
- [ckeditor-iframeinsulator](https://github.com/radiovisual/ckeditor-iframeinsulator)

## License

MIT @ [Michael Wuergler](http://numetriclabs.com)

import { Editor } from "@tinymce/tinymce-react";

/* Import TinyMCE */
import "tinymce";

/* Default icons are required. After that, import custom icons if applicable */
import "tinymce/icons/default/icons.min.js";

/* Required TinyMCE components */
import "tinymce/models/dom/model.min.js";
import "tinymce/themes/silver/theme.min.js";

/* Import a skin (can be a custom skin instead of the default) */
import "tinymce/skins/ui/tinymce-5/skin.js";

/* Import plugins */
import "tinymce/plugins/accordion";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/help/js/i18n/keynav/en.js";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

export default function TextEditor({ init, ...props }) {
    return (
        <Editor
            licenseKey="gpl"
            init={{
                height: 500,
                plugins: [
                    "accordion",
                    "advlist",
                    "anchor",
                    "autolink",
                    "charmap",
                    "code",
                    "codesample",
                    "directionality",
                    "emoticons",
                    "fullscreen",
                    "help",
                    "image",
                    "importcss",
                    "insertdatetime",
                    "link",
                    "lists",
                    "media",
                    "nonbreaking",
                    "pagebreak",
                    "preview",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "visualchars",
                    "wordcount",
                ],
                toolbar: [
                    "undo redo",
                    "blocks fontfamily fontsize",
                    "bold italic underline strikethrough forecolor backcolor",
                    "alignleft aligncenter alignright alignjustify",
                    "bullist numlist",
                    "ltr rtl",
                    "outdent indent",
                ].join(" | "),
                promotion: false,
                skin: "tinymce-5",
                browser_spellcheck: true,
                content_css: "/Blog-admin/textEditor.css",
                font_family_formats:
                    "Sans Serif=sans-serif; Serif=serif; Monospace=monospace; Cursive=cursive; Fantasy=fantasy;",
                ...init,
            }}
            {...props}
        />
    );
}

<template>
  <div class="editor" v-if="editor">
    <div class="editor__header">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        gras
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        italique
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        effacer le style
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        effacer la structure
      </button>
      <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraphe
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        titre
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        sous titre
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        liste à puces
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        liste ordonnée
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        ligne horizontale
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        saut à la ligne
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        précédent
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        suivant
      </button>

    </div>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script setup lang ="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const editor = useEditor({
  extensions: [StarterKit],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  }
})
</script>



<style >
.tiptap {
  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }


}

.editor__header button {
  padding: 0.3rem 0.6rem;
  border: 1px solid #9ca3af;
  border-radius: 0.5rem;
  background: #e5e7eb;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #d1d5db;
  }

  &.is-active {
    background: #d1d5db;
  }
}

.ProseMirror {
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
}
</style>



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
import { watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
  }>(),
  {
    modelValue: '',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value?: string | null): void
}>()

watch(() => props.modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value

  if (isSame) {
    return
  }

  editor.value?.commands.setContent(value, false)
})

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML())
  },
})
</script>


<style>
.editor__header button {
  padding: 0.3rem 0.6rem;
  border: 1px solid #9ca3af;
  border-radius: 0.5rem;
  background: #e5e7eb;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.editor__header button:hover {
  background: #d1d5db;
}

.editor__header button.is-active {
  background: #d1d5db;
}

.ProseMirror {
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
}
</style>



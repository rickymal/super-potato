<template>
  <editor-content :editor="editor" />
</template>

<script setup>
  import { useEditor, EditorContent } from "@tiptap/vue-3";
  import StarterKit from "@tiptap/starter-kit";

  const editor = useEditor({
    content: "", // <p>Henrique Mauler Borges</p>
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'tiptap-component'
      }
    }
  });
</script>

<style>
  .tiptap-component {
    border-width: thin;
    border: 0px;
    height: 300px;
    background-color:rgb(224, 220, 220);
    padding: 15px 10px;
    line-height: 1px;
    margin: 10px 00px;
    /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
    font-family: cursive;
  }

  .tiptap-component:focus {
    outline: 10px
  }
</style>
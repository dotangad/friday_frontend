import { Box, Flex, Text, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import {
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  markdownShortcutPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import './editor.css'
import { useRef } from "react";

export function EditPage({ document }) {
  const [title, setTitle] = useState(document.content.title);
  const editorRef = useRef(null);

  return <>
    <Box>
      <Flex alignItems="center" justifyContent={"space-between"}>
        <Text
          casing="uppercase"
          fontSize="md"
          fontWeight={800}
          color="gray.500"
          lineHeight={1}
          pt={"4px"}
        >
          Note
        </Text>
        <Button>Save</Button>
      </Flex>
      <Box mt={6}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="2xl"
          fontSize="2xl"
          fontWeight={800}
          color="gray.700"
          bg="white"
          rounded="lg"
          lineHeight={1}
          p={"20px"}
          mt={0}
          mb={4}
        />
        <Box>
          <MDXEditor
            ref={editorRef}
            className="mdx-editor"
            markdown={`# Hello world!`}
            plugins={[
              headingsPlugin(),
              quotePlugin(),
              listsPlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    {' '}
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                  </>
                )
              })
            ]}
          />
        </Box>
      </Box>
    </Box>
    <pre>{JSON.stringify(document, null, 2)}</pre>
  </>
}
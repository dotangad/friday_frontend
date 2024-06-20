import { Box, Flex, Text, Spinner, Input, useToast } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { EditorContent, useEditor } from '@tiptap/react';
import * as _ from "lodash";
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import TiptapText from '@tiptap/extension-text'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../authcontext';

import "./editor.css";

export function EditPage({ document }) {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const toast = useToast();
  const [title, setTitle] = useState(document.content.title);
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      TiptapText,
    ],
    content: document.content.content,
    // onUpdate: ({ editor }) => {
    //   console.log(JSON.stringify(editor.getJSON(), null, 2));
    // }
  });


  const updateM = useMutation(
    {
      mutationFn: async (content) => {
        const currentContent = { title, content };
        if (_.isEqual(currentContent, document.content)) {
          return { success: true, document };
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/update/${document._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ content: { title, content } }),
        });

        if (!response.ok) {
          throw new Error('Failed to update document');
        }

        console.log("REQUEST SENT")

        return await response.json();
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["document", document._id], () => data);
      },
      onError: (error) => {
        console.error('Error updating document:', error);
        toast({
          title: "Error updating document.",
          description: "There was an error updating your document. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  );

  useEffect(() => {
    // console.log(editor.getJSON());
    const updateInterval = setInterval(() => {
      updateM.mutate(editor.getJSON());
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [editor]);

  return <Box>
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
      {updateM.isPending ? (
        <Flex alignItems="center">
          <Spinner size="sm" />
          <Text ml={2}>Saving...</Text>
        </Flex>
      ) : (
        <Flex alignItems="center" onClick={() => updateM.mutate(editor?.getJSON())} cursor="pointer">
          <Box
            width="10px"
            height="10px"
            borderRadius="50%"
            bg={_.isEqual(document.content, { title, content: editor?.getJSON() })
              ? "green.500"
              : "red.500"}
          />
          <Text ml={2}>
            {_.isEqual(document.content, { title, content: editor?.getJSON() })
              ? "Saved"
              : "Unsaved Changes"}
          </Text>
        </Flex>
      )}
    </Flex>
    {/* TODO: show note meta */}
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
      <Box className="tiptap">
        <EditorContent
          editor={editor}
        />
      </Box>
    </Box>
  </Box>
}

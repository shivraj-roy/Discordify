import {
   Title,
   Center,
   Container,
   Textarea,
   Group,
   Button,
   Tooltip,
} from "@mantine/core";
import {
   GrPowerReset,
   GrBold,
   GrItalic,
   GrUnderline,
   GrClipboard,
} from "react-icons/gr";

const TextEditor = () => {
   return (
      <div>
         <Center m={20}>
            <Title order={3}>Text Editor</Title>
         </Center>

         {/* Editor Buttons */}
         <Center>
            <Group justify="center">
               <Button leftSection={<GrPowerReset />} variant="default">
                  Reset
               </Button>
               <Button leftSection={<GrBold />} variant="light">
                  Bold
               </Button>
               <Button leftSection={<GrItalic />} variant="light">
                  Italic
               </Button>
               <Button leftSection={<GrUnderline />} variant="light">
                  Underline
               </Button>
            </Group>
         </Center>

         {/* Foreground Color */}
         <Center>
            <Group justify="center" mt={20}>
               <Title mr={10} order={4}>
                  FG:{" "}
               </Title>
               <Tooltip label="Dark Gray (33%)" arrowSize={5} withArrow>
                  <Button color="#4f545c" radius="xl"></Button>
               </Tooltip>
               <Tooltip label="Red" arrowSize={5} withArrow>
                  <Button color="#dc322f" radius="xl"></Button>
               </Tooltip>
               <Tooltip label="Yellowish Green" arrowSize={5} withArrow>
                  <Button color="#859900" radius="xl"></Button>
               </Tooltip>
            </Group>
         </Center>

         {/* Background Color */}
         <Center>
            <Group justify="center" mt={20}>
               <Title mr={10} order={4}>
                  BG:{" "}
               </Title>
               <Tooltip label="Bluish Black" arrowSize={5} withArrow>
                  <Button color="#002b36" radius="xl"></Button>
               </Tooltip>
               <Tooltip label="Rust Brown" arrowSize={5} withArrow>
                  <Button color="#cb4b16" radius="xl"></Button>
               </Tooltip>
               <Tooltip label="Gray (40%)" arrowSize={5} withArrow>
                  <Button color="#586e75" radius="xl"></Button>
               </Tooltip>
            </Group>
         </Center>

         {/* Textarea */}
         <Container mt={20}>
            <Textarea
               placeholder="Welcome to the Discordify..."
               autosize
               minRows={10}
            />
         </Container>

         {/* Button */}
         <Center mt={20}>
            <Button leftSection={<GrClipboard />}>
               Copy Text as Discord Formatted
            </Button>
         </Center>
      </div>
   );
};
export default TextEditor;

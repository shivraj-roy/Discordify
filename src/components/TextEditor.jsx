import {
   Title,
   Center,
   Container,
   Textarea,
   Group,
   Button,
} from "@mantine/core";
import { GrPowerReset, GrBold, GrItalic, GrUnderline } from "react-icons/gr";

const TextEditor = () => {
   return (
      <div>
         <Center m={20}>
            <Title order={3}>Text Editor</Title>
         </Center>
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
         {/* <Container>
         </Group>
         {/* <Container>
            <Textarea placeholder="Enter your text here" label="Text" />
         </Container> */}
      </div>
   );
};
export default TextEditor;

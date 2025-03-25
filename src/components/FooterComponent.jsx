import { Text, Center, Anchor } from "@mantine/core";

const FooterComponent = () => {
   return (
      <Center
         mb={10}
         style={{
            bottom: 0,
            position: "fixed",
            width: "100%",
            backgroundColor: "#36393f",
         }}
      >
         <Text mr={10} size="sm">
            source code :{" "}
         </Text>
         <Anchor
            href="https://github.com/shivraj-roy/discordify"
            target="_blank"
            underline="hover"
         >
            GitHub
         </Anchor>
      </Center>
   );
};
export default FooterComponent;

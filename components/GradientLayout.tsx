import { Text, Flex, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

const GradientLayout = ({
  image,
  color,
  subtitle,
  roundedImage,
  description,
  children,
  fontColor,
  title,
}) => {
  return (
    <Box
      color={fontColor}
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%,${color}.700 35%,rgba(0,0,0,95%) 90%)`}
    >
      <Flex bgColor="rgba(255,255,255,5%)" padding="4rem" alignItems="flex-end">
        <Image
          boxShadow="2xl"
          boxSize="160px"
          src={image}
          rounded={roundedImage ? "100%" : "0.75rem"}
        />
        <Box lineHeight={0.95} paddingX="2rem">
          <Text
            fontSize="x-small"
            fontWeight="bold"
            casing="uppercase"
            paddingY="1rem"
          >
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="small">{description}</Text>
        </Box>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};

export default GradientLayout;

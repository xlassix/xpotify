// import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { Flex, Box, Divider, Input, Button, Center } from "@chakra-ui/react";
import { useState } from "react";
import NextImage from "next/image";
import { auth } from "../lib/access";

const AuthForm = ({ mode }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [_mode, setMode] = useState(mode);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    setLoading(true);
    e.target.reset();
    const res = await auth(_mode, formData);
    if (res.status !== 200) {
      try {
        setError(res.message);
      } catch (_) {
        console.log(res);
        setError("we cant access our server at this point in time");
      }
    }
    console.log("ress", res);
    setLoading(false);
    router.push("/");
  }
  function handleMode() {
    setMode(_mode === "signin" ? "signup" : "signin");
  }

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      height="100vh"
      width="100%"
      bg="black"
      color="white "
    >
      <Box
        width="25rem"
        padding="1.5rem 2rem"
        bg="gray.900"
        borderRadius="0.5rem"
      >
        <Center paddingY="0.5rem">
          <NextImage src="/logo.svg" height={50} width={181} />
        </Center>
        <form onSubmit={handleSubmit}>
          {_mode === "signup" ? (
            <>
              <p>FirstName</p>
              <Input
                minLength={2}
                bg="none"
                placeholder="First Name"
                padding="0.5rem"
                name="firstName"
                fontSize="1rem"
                lineHeight="1.5rem"
                marginY="0.25rem"
                focusBorderColor="gray.700"
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                }}
                value={formData.firstName}
                required
              />
              <p>Email address or username</p>
              <Input
                minLength={2}
                bg="none"
                placeholder="Last Name"
                padding="0.5rem"
                name="lastName"
                fontSize="1rem"
                lineHeight="1.5rem"
                marginY="0.25rem"
                focusBorderColor="gray.700"
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                }}
                value={formData.lastName}
                required
              />
            </>
          ) : null}
          <p>Email address or username</p>
          <Input
            type="email"
            bg="none"
            placeholder="Email address or username"
            padding="0.5rem"
            name="email"
            fontSize="1rem"
            lineHeight="1.5rem"
            marginY="0.25rem"
            focusBorderColor="gray.700"
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            value={formData.email}
            required
          />
          <p>Password</p>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            padding="0.75rem"
            fontSize="1rem"
            lineHeight="1.5rem"
            marginY="0.25rem"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            focusBorderColor="gray.700"
            required
          />
          {error ? (
            <p
              style={{
                textAlign: "center",
                color: "var(--chakra-colors-red-400)",
                padding: "0.2rem",
              }}
            >
              {error}
            </p>
          ) : null}
          <Button
            type="submit"
            bg="green.600"
            borderRadius="4rem"
            padding="0.5rem 1.5rem"
            margin="1rem 0 1rem auto"
            display="block"
            sx={{
              "&:hover": {
                bgColor: "green.400",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&>div": {
                justifyContent: "center",
                position: "relative",
              },
            }}
            isLoading={isLoading}
          >
            {_mode === "signin" ? "Log In" : "Register"}
          </Button>
        </form>
        <Divider />
        <Center
          onClick={() => handleMode()}
          margin="1rem"
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          <p>
            {_mode === "signin"
              ? "Don't have an account?"
              : "I have an account?"}
          </p>
        </Center>
        <Button
          display="block"
          width="100%"
          borderRadius="4rem"
          bg="gray.800"
          sx={{
            "&:hover": {
              bgColor: "gray.600",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
          textAlign="center"
          onClick={() => handleMode()}
        >
          {_mode === "signin" ? "Sign Up for xpotify" : "Sign Into xpotify"}
        </Button>
      </Box>
    </Flex>
  );
};

export default AuthForm;

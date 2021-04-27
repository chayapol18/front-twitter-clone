import {
  Flex,
  Text,
  Box,
  Image,
  Avatar,
  Button,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { CalendarIcon, InfoOutlineIcon } from "@chakra-ui/icons";

function OtherUserBio({ otherUser }) {
  const createdAtDate = new Date(otherUser.createdAt);
  const otherUserBirthDate = new Date(otherUser.birthDate);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Flex direction="column" w="600px" h="460px">
      {otherUser.backgroundImg ? (
        <Image
          src={otherUser.backgroundImg}
          alt="background img"
          h="190px"
          objectFit="cover"
        />
      ) : (
        <Image src="" bgColor="gray.400" h="190px" objectFit="cover" />
      )}
      <Flex dir="row" justify="space-between" mx="15px" h="60px">
        {otherUser.profileImg ? (
          <Avatar
            name={otherUser.name}
            src={otherUser.profileImg}
            mt="-68px"
            size="2xl"
            border="solid 5px white"
          ></Avatar>
        ) : (
          <Avatar mt="-68px" size="2xl" border="solid 5px white" />
        )}
      </Flex>

      <Flex direction="column" textAlign="left" ml="20px">
        <Stack spacing={3}>
          <Box>
            <Text fontWeight="700" fontSize="25px">
              {otherUser.name}
            </Text>
            <Text color="gray.400" mt="-5px">
              @{otherUser.username}
            </Text>
          </Box>
          <Text h="50px">{otherUser.bio}</Text>
        
          <Text color="gray.500">
            {" "}
            <InfoOutlineIcon mb="2px" /> Born{" "}
            {`${
              months[otherUserBirthDate.getMonth()]
            } ${otherUserBirthDate.getDate()}, ${otherUserBirthDate.getFullYear()}`}
            <CalendarIcon ml="15px" mb="2px" /> Joined{" "}
            {`${
              months[createdAtDate.getMonth()]
            } ${createdAtDate.getFullYear()}`}{" "}
          </Text>
          {/* {Date(user.createdAt).split(' ').slice(1, 4).join(' ')} */}
        </Stack>
      </Flex>

      <Flex direction="row" ml="5px" mt="10px">
        <Button
          variant="ghost"
        //   onClick={handleFollowButton}
          _hover={{ textDecoration: "underline" }}
        >
          <HStack spacing={1}>
            {/* <Text fontWeight="700">{numberFollowing.count}</Text> */}
            <Text color="gray.400">Following</Text>
          </HStack>
        </Button>
        <Button
          variant="ghost"
        //   onClick={handleFollowButton}
          _hover={{ textDecoration: "underline" }}
        >
          <HStack spacing={1}>
            {/* <Text fontWeight="700">{numberFollower.count}</Text> */}
            <Text color="gray.400">Follower</Text>
          </HStack>
        </Button>
      </Flex>
    </Flex>
  );
}

export default OtherUserBio;

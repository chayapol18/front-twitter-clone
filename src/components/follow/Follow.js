import {
  Flex,
  Stack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";

function Follow({ followers, following }) {
  return (
    <Flex>
      <Tabs w="600px" End>
        <TabList borderBottom='1px' pb='10px'>
          <Flex justify="space-around" w="100%">
            <Tab _selected={{ color: "blue.400" }} fontWeight="700">
              Followers
            </Tab>
            <Tab _selected={{ color: "blue.400" }} fontWeight="700">
              Following
            </Tab>
          </Flex>
        </TabList>

        <TabPanels>
          <TabPanel p='0px'>
            {followers.map((follower) => (
              <Flex
                direction="row"
                justify="space-between"
                alignItems="center"
                borderBottom="1px solid"
                borderColor="gray.200"
                p='16px'
              >
                <Flex direction="row">
                  <Avatar src={follower.FollowBy.profileImg} mr="15px" />
                  <Stack spacing="0" textAlign="left">
                    <Text>{follower.FollowBy.name}</Text>
                    <Text color="gray.400">@{follower.FollowBy.username}</Text>
                    <Text>{follower.FollowBy.bio}</Text>
                  </Stack>
                </Flex>

                <Button
                  borderRadius="full"
                  bgColor="blue.400"
                  color="white"
                  h="32px"
                  _hover={{ background: "blue.500" }}
                >
                  Following
                </Button>
              </Flex>
            ))}
          </TabPanel>
          <TabPanel p='0px'>
            {following.map((following) => (
              <Flex
                direction="row"
                justify="space-between"
                alignItems="center"
                borderBottom="1px solid"
                borderColor="gray.200"
                p='16px'
              >
                <Flex direction="row">
                  <Avatar src={following.Following.profileImg} mr="15px" />
                  <Stack  spacing="0" textAlign="left">
                    <Text>{following.Following.name}</Text>
                    <Text color="gray.400">
                      @{following.Following.username}
                    </Text>
                    <Text>{following.Following.bio}</Text>
                  </Stack>
                </Flex>
                <Button
                  borderRadius="full"
                  bgColor="blue.400"
                  color="white"
                  h="32px"
                  _hover={{ background: "blue.500" }}
                >
                  Following
                </Button>
              </Flex>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Follow;

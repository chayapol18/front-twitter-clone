import { Avatar, Flex, Text, Stack, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "../../config/axios";
import { AuthContext } from "../../contexts/AuthContextProvider";

function Search({ dataUser, handleOtherUserPage }) {
  const { user } = useContext(AuthContext);
  const [followingByUser, setFollowingByUser] = useState();
  const [checkFollowing, setCheckFollowing] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [isFollow, setIsFollow] = useState(false);
  const [isUnfollow, setIsUnfollow] = useState(false);

  const getFollowingByUser = async () => {
    try {
      const res = await axios.get(`/follows/following`);
      setFollowingByUser(res.data.following);
      const data = res.data.following;
      setCheckFollowing(() =>
        data.some((item) => item.Following.id === dataUser.id)
      );
      setIsloading(false);
    } catch (err) {}
  };

  useEffect(() => {
    getFollowingByUser();
  }, [isFollow]);

  const handleFollow = async (otherUserId) => {
    try {
      const res = await axios.post(`/follows/follow-to/${otherUserId}`);
      setIsFollow(true);
      setIsUnfollow(false)
    } catch (err) {}
  };

  const handleUnfollow = async (otherUserId) => {
    try {
      const res = await axios.delete(`/follows/${otherUserId}`);
      setIsFollow(false);
      setIsUnfollow(true)
    } catch (err) {}
  };

  if (isLoading) return <Text>Data is loading</Text>;

  return (
    <Flex mx="auto" w="100%" borderBottom="1px solid" borderColor="gray.200">
      {dataUser ? (
        <Flex direction="row" w="100%" justify="space-between" p="15px">
          <Flex
            alignItems="center"
            onClick={() => handleOtherUserPage(dataUser.id)}
          >
            <Avatar src={dataUser.profileImg} />
            <Stack spacing="0px" ml="15px" textAlign="left">
              <Text>{dataUser.name}</Text>
              <Text color="gray.400">@{dataUser.username}</Text>
            </Stack>
          </Flex>
          {dataUser.id === user.id ? null : !isUnfollow && (checkFollowing || isFollow) ? (
            <Button
              border="1px solid"
              borderRadius="full"
              fontSize="14px"
              bgColor="blue.400"
              color="white"
              onClick={() => handleUnfollow(dataUser.id)}
            >
              Following
            </Button>
          ) : (
            <Button
              border="1px solid"
              borderRadius="full"
              fontSize="14px"
              bgColor="white"
              color="blue.400"
              onClick={() => handleFollow(dataUser.id)}
            >
              Follow
            </Button>
          )}
        </Flex>
      ) : (
        <Text mx="auto" p="15px">
          Input something to search.
        </Text>
      )}
    </Flex>
  );
}

export default Search;

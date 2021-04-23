import Menulist from "../components/banner/Menulist";
import TrendBar from "../components/banner/TrendBar";
import Content from "../components/container/Content";
import { Text, Flex, Button, Grid, GridItem } from "@chakra-ui/react";
import Tweets from "../components/tweet/Tweets";
import { useContext, useEffect, useState } from "react";
import axios from "../config/axios";
import { AuthContext } from "../contexts/AuthContextProvider";


function Home() {
  const [tweet, setTweet] = useState([]);
  const [triggerDelete, setTriggerDelete] = useState(false);

  const getTweet = async () => {
    try {
      const res = await axios.get("/tweets");
      setTweet(res.data.tweets);
    } catch (err) {}
  };

  useEffect(() => {
    getTweet();
  }, [triggerDelete]);


  return (
    <Flex direction='row'>
        <Menulist
            pathName='Home'
            getTweet={getTweet}
        />

        <Content header='Home'>
            <Tweets
            pathName='Home'
            tweet={tweet}
            setTriggerDelete={setTriggerDelete}
            getTweet={getTweet}
            />
        </Content>

        <TrendBar />
    </Flex>
    // <Grid
    //   h="656px"
    //   templateRows="repeat(13, 1fr)"
    //   templateColumns="repeat(26, 1fr)"
    // >
    //   <GridItem
    //     rowSpan={13}
    //     colSpan={7}
    //     rowStart={1}
    //     colStart={1}
    //     borderRight="1px solid"
    //     borderColor="gray.200"
    //   >
    //     <Menulist pathName="Home" getTweet={getTweet} />
    //   </GridItem>

    //   <GridItem
    //     rowSpan={1}
    //     colSpan={10}
    //     rowStart={1}
    //     colStart={8}
    //     borderBottom="solid 1px"
    //     borderColor="gray.200"
    //   >
    //     <Text
    //       textAlign="left"
    //       fontSize="20px"
    //       fontWeight="700"
    //       p="8px 0 0 13px"
    //       position="fixed"
    //     >
    //       Home
    //     </Text>
    //   </GridItem>

    //   <GridItem
    //     rowSpan={12}
    //     colSpan={10}
    //     rowStart={2}
    //     colStart={8}
    //     overflowY="auto"
    //     css={{
    //       "&::-webkit-scrollbar": {
    //         display: "none",
    //       },
    //     }}
    //   >
    //     <Content>
    //       <Tweets
    //         tweet={tweet}
    //         setTriggerDelete={setTriggerDelete}
    //         getTweet={getTweet}
    //       />
    //     </Content>
    //   </GridItem>

    //   <GridItem
    //     rowSpan={13}
    //     colSpan={9}
    //     rowStart={1}
    //     colStart={18}
    //     borderLeft="1px solid"
    //     borderColor="gray.200"
    //   >
    //     <TrendBar />
    //   </GridItem>
    // </Grid>
  );
}

export default Home;

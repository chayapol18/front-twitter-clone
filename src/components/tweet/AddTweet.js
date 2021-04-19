import { Flex, Image, Text, HStack, Button, IconButton, Textarea, Input, } from '@chakra-ui/react'
import { AttachmentIcon, CloseIcon } from '@chakra-ui/icons'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider'
import axios from '../../config/axios'

function AddTweet({ getTweet }) {
    const { user } = useContext(AuthContext)

    const [content, setContent] = useState('')
    

    const handleAddTweet = async () => {
        await axios.post('/tweets', {content, levelTweetId: 1})
        setContent('')
        getTweet()
    }
    
console.log(content)
    return(
        <Flex direction='row' p='10px 10px 0 10px' w='600px' borderBottom='solid 1px' borderColor='gray.200'>
            <Image src={user.profileImg} objectFit='cover' alt='imgUser' boxSize="50px" borderRadius='full' />

            <Flex direction='column' ml='5px' w='100%'>
                <Input placeholder="What's happening ?" borderStyle='none' _focus={{ borderStyle:'none' }} value={content} onChange={(e) => setContent(e.target.value)}/>

                <Flex direction='row' m='10px 0' w='100%' >
                    <HStack spacing="10px" justify='space-between' w='100%'>
                        <IconButton _hover={{ background: "blue.100" }} variant="ghost" as={AttachmentIcon} w='20px' h='20px' color="blue.400" borderRadius='full'/>
                        { content ? <Button onClick={handleAddTweet} borderRadius='full' bgColor='blue.400' color='white' _hover={{ background: "blue.500", }}>Tweet</Button> : <Button onClick={handleAddTweet} borderRadius='full' bgColor='blue.400' color='white' _hover={{ background: "blue.500", }} isDisabled>Tweet</Button>}
                        
                    </HStack>
                </Flex>
            </Flex>

        </Flex>
    )   
}

export default AddTweet
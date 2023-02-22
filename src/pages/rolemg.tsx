import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import { useColor } from "../hooks/useColor";
import { useFontSize } from "../hooks/useFontSize";
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Checkbox, Flex, InputGroup, InputLeftElement, Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Text, Textarea, useColorModeValue, Modal, useDisclosure, Image, ModalFooter, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useFormik } from "formik";
import useMarketplaceContract from "../hooks/useMarketplaceContract"
import { useEthConnection } from "../context/EthConnectionProvider";
import * as yup from "yup";
import { dev } from "../utils/log";
import { MdOutlineCreate as CreateIcon } from "react-icons/md";
import { FiFile as FileIcon } from "react-icons/fi";
import { Marketplace } from "../typechain-types";

const nftImageTypesAccepted = "image/jpeg,image/png,image/gif,image/svg,image/webp";


export default function RoleMG() {

    const color = useColor();
    const fs = useFontSize();
    const navigate = useNavigate();
    const [checked, handleChecked] = useState<Array<boolean>>([false]);
    const userDatas = [{
        username: "Jakson",
        sc_address: "HF839839F3JF93JF9J39",
        image_src: "dwdawdawd",
        discord: "9udwa9jd90wd09aw9d0",
        facebook: "fefefaj9ef9u9023",
        instagram: "jwidjwjdiwjd",
    }, {
        username: "Jakson",
        sc_address: "HF839839F3JF93JF9J39",
        image_src: "dwdawdawd",
        discord: "9udwa9jd90wd09aw9d0",
        facebook: "fefefaj9ef9u9023",
        instagram: "jwidjwjdiwjd",
    }, {
        username: "Jakson",
        sc_address: "HF839839F3JF93JF9J39",
        image_src: "dwdawdawd",
        discord: "9udwa9jd90wd09aw9d0",
        facebook: "fefefaj9ef9u9023",
        instagram: "jwidjwjdiwjd",
    }
    ]

    return (
        <Box as="main" padding={{ base: "4", md: "8" }} width="85%" marginX="auto" >
            <Text fontSize={fs.lg} color={color.mainText} fontFamily="Poppins" textAlign={'center'}>
                Admin Panel
            </Text>
            <TableContainer marginTop={'30px'}>
                <Table variant='simple' color={color.mainText}>
                    <TableCaption color={color.subText}>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th color={color.label}>Username</Th>
                            <Th color={color.label}>SmartContract Address</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* <Tr color={checked[0] ? color.label : color.mainText} onDoubleClick={() => { navigate('/request') }}>
                            <Td>Jakson</Td>
                            <Td>89AW8D8WDHW8AH8WD</Td>
                            <Td><Checkbox onChange={() => { handleChecked(prevState => prevState.map((item, idx) => idx === 0 ? !item : item)) }} /></Td>
                        </Tr> */}
                        {
                            userDatas.map((userData, index) => (
                                <TRow
                                    userData={userData}
                                    handleChecked={() => { handleChecked(prevState => prevState.map((item, idx) => idx === 0 ? !item : item)) }}
                                />
                            ))
                        }
                    </Tbody>
                    <Tfoot>

                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

interface TRowProps {
    userData: Marketplace.UserDataStructure
    handleChecked: Function
}

const TRow = ({ userData, handleChecked }: TRowProps) => {
    const color = useColor();
    const fs = useFontSize();
    const [checked, setChecked] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tr color={checked ? color.label : color.mainText} onDoubleClick={onOpen}>
                <Td>{userData.username}</Td>
                <Td>{userData.sc_address}</Td>
                <Td><Checkbox onChange={() => { setChecked((checked) => (!checked)) }} /></Td>
            </Tr>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent background={color.background} borderRadius={"15px"}>
                    <Flex flexDirection={'column'} color={color.mainText} paddingX={'48px'}>
                        <Text fontSize={fs.md} textAlign={'center'} marginTop={'20px'} fontWeight={'700'} fontFamily="Poppins">
                            User Information
                        </Text>
                        <Box fontSize={fs.sm}  marginTop="20px">
                            <Text color={color.label} textAlign='start'>
                                Username:
                            </Text>
                            <Text textAlign={'end'}>
                                {userData.username}
                            </Text>
                        </Box>
                        <Box fontSize={fs.sm}  marginTop={'5px'}>
                            <Text color={color.label} textAlign='start'>
                                SmartContract Address:
                            </Text>
                            <Text textAlign={'end'}>
                                {userData.sc_address}
                            </Text>
                        </Box>
                        <Box fontSize={fs.sm}   marginTop={'5px'}>
                            <Text color={color.label} textAlign='start'>
                                Image:
                            </Text>
                            <Flex justifyContent={'center'}>
                                <Image boxSize={"150px"} src={userData.image_src} />
                            </Flex>
                        </Box>
                        <Box fontSize={fs.sm}   marginTop={'5px'}>
                            <Text color={color.label} textAlign='start'>
                                Discord:
                            </Text>
                            <Text textAlign={'end'}>
                                {userData.discord}
                            </Text>
                        </Box>
                        <Box fontSize={fs.sm}   marginTop={'5px'}>
                            <Text color={color.label} textAlign='start'>
                                Facebook:
                            </Text>
                            <Text textAlign={'end'}>
                                {userData.facebook}
                            </Text>
                        </Box>
                        <Box fontSize={fs.sm}   marginTop={'5px'}>
                            <Text color={color.label} textAlign='start'>
                                Instagram:
                            </Text>
                            <Text textAlign={'end'}>
                                {userData.instagram}
                            </Text>
                        </Box>
                        <Flex justifyContent={'end'} marginTop={'40px'} marginBottom={'20px'}>
                        <Button width={'25%'} background={color.button3} onClick={onClose}>Cancel</Button>
                        </Flex>
                    </Flex>
                </ModalContent>
            </Modal>
        </>

    )
}
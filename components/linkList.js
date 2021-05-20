import React, { useState, useEffect } from 'react'
import styles from '../styles/LinkList.module.css'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast
} from '@chakra-ui/react'

export default function linkList() {
  const [list, setList] = useState([])
  const [inputName, setInputName] = useState('')
  const [inputLink, setInputLink] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef()
  const toast = useToast()
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)

  function handleMoreButton (event, index) {
    event.stopPropagation()
    event.preventDefault()
    const newList = list.map((item, i) => {
      if (i === index) item.active = true
      return item
    })
    setList(newList)
  }

  function handleRemoveLink (event, index) {
    event.stopPropagation()
    event.preventDefault()
    const newList = list.filter((item, i) => i !== index)
    setList(newList)
    toast({
      title: "已移除快捷方式",
      status: "success",
      duration: 1000,
      isClosable: true,
    })
  }

  function handleEditLink (event, index) {
    event.stopPropagation()
    event.preventDefault()
    onOpen()
    const item = list[index]
    setInputName(item.title)
    setInputLink(item.link)
    const newList = list.map(item => {
      item.active = false
      return item
    })
    setList(newList)
    setIsEdit(true)
    setEditIndex(index)
  }

  function handleShowDialog () {
    onOpen()
  }

  function resetInput () {
    setInputName('')
    setInputLink('')
  }

  function handleCloseModal () {
    resetInput()
    onClose()
  }

  function handleAddLink () {
    let newList = []
    if (isEdit) {
      newList = list.map((item, index) => {
        if (index === editIndex) {
          item.title = inputName
          item.link = inputLink
        }
        return item
      })
    } else {
      newList = [...list, {
        title: inputName,
        imageUrl: 'https://www.youtube.com/s/desktop/09255fbe/img/favicon_32.png',
        link: inputLink
      }]
    }
    setList(newList)
    localStorage.setItem('shortcutList', JSON.stringify(newList))
    toast({
      title: isEdit ? "已更新快捷方式" : "已添加快捷方式",
      status: "success",
      duration: 1000,
      isClosable: true,
    })
    setIsEdit(false)
    setEditIndex(-1)
    onClose()
    resetInput()
  }

  useEffect(() => {
    document.body.onclick = () => {
      const newList = list.map(item => {
        item.active = false
        return item
      })
      setList(newList)
    }
  })

  useEffect(() => {
    const storageList = localStorage.getItem('shortcutList') || []
    setList(JSON.parse(storageList))
  }, [])

  return (
    <div className={styles.listWrapper}>
    {
      list.map((item, index) => (
        <a
          className={styles.listItem}
          href={item.link}
          title={item.title}
          key={index}
        >
          <div
            className={styles.moreButton}
            onClick={e => handleMoreButton(e, index)}
          ></div>
          <div
            className={styles.actionMenu}
            style={{display: item.active ? 'block' : 'none'}}
          >
            <button
              className={styles.dropdownItem}
              onClick={e => handleEditLink(e, index)}
            >修改快捷方式</button>
            <button
              className={styles.dropdownItem}
              onClick={e => handleRemoveLink(e, index)}
            >移除</button>
          </div>
          <div className={styles.tileIcon}>
            <img src={item.imageUrl} />
          </div>
          <div className={styles.tileTitle}>{item.title}</div>
        </a>
      ))
    }
      <button
        className={styles.listItem}
        style={{ display: list.length < 10 ? 'flex' : 'none'}}
        onClick={() => handleShowDialog()}
      >
        <div className={styles.tileIcon}>
          <div className={styles.addButton}></div>
        </div>
        <div className={styles.tileTitle}>添加快捷方式</div>
      </button>
      <Modal
        onClose={handleCloseModal}
        isOpen={isOpen}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加快捷方式</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>名称</FormLabel>
              <Input ref={initialRef} placeholder="请输入网站名称" value={inputName} onChange={e => setInputName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>网址</FormLabel>
              <Input placeholder="请输入网址" value={inputLink} onChange={e => setInputLink(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal} mr={3} w={20} size="sm">取消</Button>
            <Button
              colorScheme="blue"
              w={20}
              size="sm"
              disabled={inputName === '' || inputLink === ''}
              onClick={() => handleAddLink()}
            >
              完成
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

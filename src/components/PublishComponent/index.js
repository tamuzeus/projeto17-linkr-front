import { useState } from "react";
import publishPost from ".././services/Api.js"
import { useRef,useContext } from "react";
import UserContext from '../contexts/UserContext';
import {
    Publishstyle,
    ImgBody,
    PerfilImg,
    Form,
    WhatToday,
    Inputlink,
    Inputpost,
    Button,
    ButtonArea,
    ButtonDesative
} from "./styled.js";

export default function Publish() {
    
    const linkref = useRef(null);
    const postref = useRef(null);

    const [link, setLink] = useState('')
    const [post, setPost] = useState('')

    const {pictureUrl,setPictureUrl} = useContext(UserContext)
    const localPictureUrl = localStorage.getItem('pictureUrl')
    setPictureUrl(localPictureUrl)


    //desative buttons and area
    const [load, setload] = useState(false)
    const [clicked, setClicked] = useState(false)

    function HandleForm(e) {
        e.preventDefault()

        const infos = {
            link, post
        }

        const promise = publishPost(infos)
        promise.catch(res => {
            alert('Houve um erro ao publicar seu link')
            setClicked(false)
            setload(false)
        })
        promise.then(res => {
            alert('Post publicado!')
            console.log(infos)
            setClicked(false)
            linkref.current.value = ''
            postref.current.value = ''
        })
    }

    return (
        <Publishstyle>
            <ImgBody>
                <PerfilImg src={pictureUrl ? pictureUrl : 'https://yt3.ggpht.com/a/AATXAJyAjXWhg85XlBUBufDpYQ7zB7GIiIlg9js4_wCoFA=s900-c-k-c0xffffffff-no-rj-mo'} />
            </ImgBody>

            <Form>
                <WhatToday>What are you going to share today?</WhatToday>
                <Inputlink type='text' ref={linkref} onChange={(e) => setLink(e.target.value)} value={link} placeholder="http://..." required disabled={load} />
                <Inputpost type='text' ref={postref} onChange={(e) => setPost(e.target.value)} value={post} placeholder="Awesome article about #javascript" disabled={load} />

                <ButtonArea onClick={() => { setClicked(!clicked) }}>
                    {clicked ?
                        <ButtonDesative disabled={load}>
                            <p>Publishing...</p>
                        </ButtonDesative>
                        :
                        <Button onClick={HandleForm} disabled={load}>
                            <p>Publish</p>
                        </Button>}
                </ButtonArea>
            </Form>
        </Publishstyle>
    )
}

import { createLazyFileRoute } from '@tanstack/react-router'
import { BrowserRouter } from 'react-router-dom'
import CharactersList from '../components/Character/CharactersCards'

export const Route = createLazyFileRoute('/')({
    component: Index,
})


function Index() {

    return (
        <>
        <BrowserRouter>
        <CharactersList></CharactersList>
        </BrowserRouter>
        </>
    )
}
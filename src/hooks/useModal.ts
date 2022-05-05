import { Dispatch, SetStateAction, useCallback, useState } from 'react'

// type ReturnType = {
//     isModalVisible: boolean
//     setIsModalVisible: Dispatch<SetStateAction<boolean>>
//     showModal: () => void
//     handleModalOk: () => void
//     handleModalCancel: () => void
// }
type ReturnType = [boolean, Dispatch<SetStateAction<boolean>>, () => void, () => void, () => void]

const useModal = (): ReturnType => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = useCallback(() => {
        setIsModalVisible(true)
    }, [])

    const handleModalOk = useCallback(() => {
        setIsModalVisible(false)
    }, [])

    const handleModalCancel = useCallback(() => {
        setIsModalVisible(false)
    }, [])

    return [isModalVisible, setIsModalVisible, showModal, handleModalOk, handleModalCancel]
}

export default useModal

import { MenuButton } from '../atom/MenuButton'

export const MakeRoomButton = () => {
  return (
    <>
      <MenuButton menuTitle="新規ルーム作成" menuDescription="ルームを新しく作成します。" isNew={true} />
    </>
  )
}

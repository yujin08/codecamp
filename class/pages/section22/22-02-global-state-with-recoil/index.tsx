import { useEffect } from "react";
import { isEditState } from "../../../src/commons/stores";
import BoardWriter from "../../../src/components/units/22-global-state/BoardWrite.container";
import { useRecoilState } from "recoil";

export default function GlobalStateWithRecoilPage(): JSX.Element {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(false);
  }, []);

  return <BoardWriter />;
}

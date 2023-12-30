import { GridItemType } from "@/types/GridItemType";
import b7Svg from '@/svgs/b7.svg';
import { items } from "@/data/items";


type Props = {
    item: GridItemType,
    click: () => void
}

export const GridItem = ({item, click}: Props) => {
    return (
        <div
            className={
                `${item.permanentShown || item.shown ? 'bg-[#1550FF]' : 'bg-[#E2E3E3]'}
                h-24 rounded-2xl flex justify-center items-center cursor-pointer`
            }
            onClick={click}
        >
            {!item.permanentShown && !item.shown &&
                <img src={b7Svg.src} alt="" width={40}/>
            }

            {(item.permanentShown || item.shown) && item.item !== null &&
                <img src={items[item.item].icon.src} alt="" width={40}/>
            }
        </div>
    )
}
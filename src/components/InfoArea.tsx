"use client"

import logo from "@/assets/devmemory_logo.png";
import RestartIcon from '@/svgs/restart.svg';
import { InfoAreaInfo } from "./infoAreaInfo";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { GridItemType } from "@/types/GridItemType";
import { items } from "@/data/items";
import { GridArea } from "./GridArea";
import { GridItem } from "./GridItem";
import { formatTimeElapsed } from "@/helpers/formtTimeElapsed";



export const InfoArea = () => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [moveCount, setMoveCount] = useState<number>(0);
    const [showCount, setShowCount] = useState<number>(0);
    const [gridItems, setGridItems] = useState<GridItemType[]>([]);

    useEffect(() => resetAndCreatGrid(), []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
    
        if (playing) {
            timer = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        }
    
        return () => {
            clearInterval(timer);
        };
    }, [playing]);

    
    const resetAndCreatGrid = () => {
        setTimeElapsed(0);
        setMoveCount(0);
        setShowCount(0);


        let tmpGrid: GridItemType[] = [];
        for(let i = 0; i < (items.length * 2); i++) {
            tmpGrid.push({
                item: null,
                shown: false,
                permanentShown: false
            })
        }

        for(let w = 0; w < 2; w++) {
            for(let i = 0; i < items.length; i++){
                let pos = -1;
                while(pos < 0 || tmpGrid[pos].item !== null) {
                    pos = Math.floor(Math.random() * (items.length * 2));
                }
                tmpGrid[pos].item = i;
            }
        }

        setGridItems(tmpGrid);

        setPlaying(true);
    };

    const handleItemClick = (index: number) => {
        if(playing && index !== null && showCount < 2) {
            let tmpGrid = [...gridItems];
            if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
                tmpGrid[index].shown = true;
                setShowCount(showCount + 1);
            }
            setGridItems(tmpGrid);
        }
    }

    useEffect(() => {
        if(showCount == 2) {
            let opened = gridItems.filter(item => item.shown === true);
            if(opened.length === 2) {

                if(opened[0].item === opened[1].item ) {
                    let tmpGrid = [...gridItems];
                    for(let i in tmpGrid) {
                        if(tmpGrid[i].shown) {
                            tmpGrid[i].permanentShown = true;
                            tmpGrid[i].shown = false;
                        }
                    }
                    setGridItems(tmpGrid);
                    setShowCount(0);
                }else {
                    setTimeout(() => {
                        let tmpGrid = [...gridItems];
                        for(let i in tmpGrid) {
                            tmpGrid[i].shown = false;
                        }
                        setGridItems(tmpGrid);
                        setShowCount(0);
                    }, 1000)
                }

                

                setMoveCount(moveCount => moveCount + 1);
            }
        }
    }, [showCount, gridItems])


    return (
        <>
            <div className="flex flex-col w-auto items-center mb-12 md:items-start">
                <a href="https://b7web.com.br" className="block">
                    <img src={logo.src} alt="Logo da B7Web" width={200}/>
                </a>

                <div className="w-full my-2 mx-0 flex justify-around items-center md:justify-start md:items-start">
                    <div className="my-5 mx-0 ">
                        <InfoAreaInfo label="Tempo" value={formatTimeElapsed(timeElapsed)}/>
                        <InfoAreaInfo label="Movimentos" value={moveCount.toString()}/>
                    </div>
                </div>

                <Button label="Reiniciar" icon={RestartIcon.src} onClick={resetAndCreatGrid} />
            </div>
        
            <GridArea>
                {gridItems.map((item, index) => (
                    <GridItem
                        key={index}
                        item={item}
                        click={() => handleItemClick(index)}
                    />
                ))}
            </GridArea>
        </>
    )
}
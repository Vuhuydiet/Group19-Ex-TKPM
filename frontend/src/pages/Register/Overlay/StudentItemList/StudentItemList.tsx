import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import '../item_list.css'
import { Student } from "../../../../services/studentAPIServices";
import NothingDisplay from "../../../../components/NothingDisplay/NothingDisplay";

interface ItemListProps {
    itemList: Student[],
    setIsHide: (isHide: boolean) => void
    setSelectedItem?: (selectedItem: any) => void
    setItemInput?: (itemInput: string) => void
}

const StudentItemList = ({ itemList, setIsHide, setSelectedItem, setItemInput }: ItemListProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItemState] = useState("");

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const items = container.querySelectorAll(".selector__item");
            const containerHeight = container.clientHeight;
            const scrollTop = container.scrollTop;

            items.forEach((item) => {
                const el = item as HTMLElement;
                const itemTop = el.offsetTop;
                const itemBottom = itemTop + el.offsetHeight;
                const containerBottom = scrollTop + containerHeight;

                const isVisible = itemTop >= scrollTop && itemBottom <= containerBottom; // Kiểm tra nếu item còn trong phạm vi hiển thị

                const distance = Math.abs(scrollTop - itemTop);
                const ratio = Math.min(distance / (containerHeight / 2), 1);

                const scale = 1 - ratio * 0.15;
                const opacity = 1 - ratio * 0.5;


                const blur = isVisible ? 0 : ratio * 5;

                el.style.transform = `scale(${scale})`;
                el.style.opacity = `${opacity}`;
                el.style.filter = `blur(${blur}px)`;
            });
        };

        const scrollToFirstItem = () => {
            const firstItem = container.querySelector(".selector__item") as HTMLElement;
            if (firstItem) {
                const offset = firstItem.offsetTop - (container.clientHeight / 2 - firstItem.offsetHeight / 2);
                container.scrollTop = offset;
            }
        };

        const timeout = setTimeout(() => {
            scrollToFirstItem();
            handleScroll();
        }, 50);

        container.addEventListener("scroll", handleScroll);
        return () => {
            clearTimeout(timeout);
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const handleSave = () => {
        if (!selectedItem) return;

        const selectedItemValue = itemList.find((item) => item.id === selectedItem);

        setSelectedItem && setSelectedItem(selectedItemValue!);
        setItemInput && setItemInput(selectedItemValue!.id);

        setIsHide(false);
    }

    const handleCancel = () => {
        setIsHide(false);
    }


    return (
        <>
            <div className="virtual-background virtual-background-frontside">

                <div className="selector">
                    <div className="selector__header">
                        <h1>Student Selector</h1>
                        <p>Choose student in list</p>
                    </div>

                    <div className="selector__body" ref={containerRef}>
                        {itemList.length === 0 && <NothingDisplay desciption="No items available" />}
                        {itemList.map((item) => (
                            <>
                                <input
                                    type="radio"
                                    id={`item__${item.id}`}
                                    name="item_selector"
                                />
                                <label
                                    onClick={() => setSelectedItemState(item.id)}
                                    htmlFor={`item__${item.id}`} key={item.id} className="selector__item">
                                    <div className="selector__item__icon">
                                        <FontAwesomeIcon icon={faCubes} className='icon__item' />
                                    </div>
                                    <div className="selector__item__content">
                                        <span>{item.name}</span>
                                    </div>
                                </label>
                            </>
                        ))}
                        {itemList.length !== 0 &&
                            <>
                                <div className="selector__item selector__item--spacer"></div>
                                <div className="selector__item selector__item--spacer"></div>
                                <div className="selector__item selector__item--spacer"></div>
                            </>}

                    </div>

                    <div className="selector__footer">
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleSave}>Save</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default StudentItemList;
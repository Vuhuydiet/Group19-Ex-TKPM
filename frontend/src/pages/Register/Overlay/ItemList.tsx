import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import './item_list.css'

interface ItemListProps {
    itemList: [
        any
    ],
    setIsHide: (isHide: boolean) => void
    setSelectedItems: (selectedItems: any) => void
}

const ItemList = ({ itemList, setIsHide, setSelectedItems }: ItemListProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

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
        const selectedItems = Array.from(containerRef.current?.querySelectorAll("input[type='radio']:checked") || []).map((input) => {
            const label = input.nextElementSibling as HTMLLabelElement;
            return {
                id: input.id,
                name: label.querySelector(".selector__item__content span")?.textContent,
            };
        });

        console.log(selectedItems);
        setSelectedItems(selectedItems);
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
                        <h1>Item Selector</h1>
                        <p>Choose item in list</p>
                    </div>

                    <div className="selector__body" ref={containerRef}>
                        <input type="radio" id="item__id" />
                        {itemList.map((item) => (
                            <>
                                <label htmlFor="item__id" key={item.id} className="selector__item">
                                    <div className="selector__item__icon">
                                        <FontAwesomeIcon icon={faCubes} className='icon__item' />
                                    </div>
                                    <div className="selector__item__content">
                                        <span>{item.name}</span>
                                    </div>
                                </label>
                            </>
                        ))}
                        <div className="selector__item selector__item--spacer"></div>
                        <div className="selector__item selector__item--spacer"></div>
                        <div className="selector__item selector__item--spacer"></div>

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

export default ItemList;
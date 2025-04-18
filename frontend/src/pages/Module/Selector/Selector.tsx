import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react';
import "./selector.css"
import { CourseAPIServices } from '../../../services/courseAPIServices';

interface SelectorProps {
    prerequisite: string[] | undefined,
    setPrerequisite: (prerequisite: string[]) => void,
    setIsHide: (isHide: boolean) => void

}

const Selector = ({ prerequisite, setPrerequisite, setIsHide }: SelectorProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const courseService = new CourseAPIServices();
    const [modules, setModules] = useState<{ id: string, name: string }[]>([]);
    const [theChosenPrerequisite, setTheChosenPrerequisite] = useState<string[]>([]);

    useEffect(() => {
        setTheChosenPrerequisite(prerequisite || []);
    }, [prerequisite])

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const data = await courseService.getCourses();
                setModules(data.map(module => ({ ...module, id: (module.id) })));
            } catch (error) {
                console.error("Failed to fetch modules", error);
            }
        };

        fetchModules();
    }, []);

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

                const isVisible = itemTop >= scrollTop && itemBottom <= containerBottom;

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
        console.log("Selected prerequisites:", theChosenPrerequisite);
        setPrerequisite(theChosenPrerequisite);
        setIsHide(true);
    }

    const handleCancel = () => {
        setIsHide(true);
    }


    return (
        <>
            <div className="virtual-background virtual-background-frontside">

                <div className="selector">
                    <div className="selector__header">
                        <h1>Prerequisite Selector</h1>
                        <p>Choose prerequisite module</p>
                    </div>

                    <div className="selector__body" ref={containerRef}>
                        {/* 
                        {modules.map((mod) => (
                            <>
                                <input type="checkbox" id={String(mod.id)} />
                                <label htmlFor={mod.name} key={mod.id} className="selector__item">
                                    <div className="selector__item__icon">
                                        <FontAwesomeIcon icon={faCubes} className='icon__item' />
                                    </div>
                                    <div className="selector__item__content">
                                        <span>{mod.name}</span>
                                    </div>
                                </label>
                            </>
                        ))} */}
                        {modules.map((mod) => (
                            <div key={mod.id} className="selector__wrapper">
                                <input
                                    type="radio"
                                    id={String(mod.id)}
                                    checked={theChosenPrerequisite && theChosenPrerequisite.includes(mod.id)}
                                    name='prerequisite'
                                />
                                <label
                                    onClick={() => {
                                        setTheChosenPrerequisite([mod.id]);
                                    }}
                                    htmlFor={String(mod.id)} className="selector__item">
                                    <div className="selector__item__icon">
                                        <FontAwesomeIcon icon={faCubes} className='icon__item' />
                                    </div>
                                    <div className="selector__item__content">
                                        <span>{mod.name}</span>
                                    </div>
                                </label>
                            </div>
                        ))}

                        <input
                            type="radio"
                            id="no-prerequisite"
                            checked={theChosenPrerequisite && theChosenPrerequisite.length === 0}
                            name='prerequisite'
                        />
                        <label
                            onClick={() => {
                                setTheChosenPrerequisite([]);
                            }}
                            htmlFor="no-prerequisite" className="selector__item">
                            <div className="selector__item__icon">
                                <FontAwesomeIcon icon={faCubes} className='icon__item' />
                            </div>
                            <div className="selector__item__content">
                                <span>None</span>
                            </div>
                        </label>
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

export default Selector;
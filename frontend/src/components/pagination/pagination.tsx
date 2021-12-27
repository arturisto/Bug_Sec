import React, {useState} from 'react';
import { useSelector } from 'react-redux';
//components
//types
import { state as rootState } from '../../types/state';
import { Pagination as PaginationType} from '../../types/pagination';

import "./pagination.css";


const Pagination:React.FC<PaginationType> = (props) => {
    const { totalDocumentsForSelection } = useSelector( (state:rootState ) => state);
    const [activeItem, setActiveItem] = useState(1);
    const maxPages = Math.ceil(totalDocumentsForSelection/props.itemsPerPage);

    let paginationItems = [];
    const revisedMaxPages = Math.max(1, maxPages - 4);
    const startPagination = Math.min(
      revisedMaxPages,
      activeItem > 2 ? activeItem - 2 : 1
    );
    const endPagination = Math.min(
      maxPages,
      Math.max(5, activeItem < maxPages - 2 ? activeItem + 2 : maxPages)
    );
    // const endPagination = activeItem < maxPages - 2 ? activeItem + 2 : maxPages;
    
    const handlePagination = (newPage: number) => {
        props.handleChangePage(newPage);
        setActiveItem(newPage);
    }
    const handlePaginationShift = (direction: boolean) => {
        //true - shift one page previous, false - shift one page next
        if(direction && activeItem > 1) props.handleChangePage(activeItem - 1);
        else if(!direction && activeItem < maxPages-1) props.handleChangePage(activeItem + 2);

    }
    for (let i = startPagination; i <= endPagination; i++) {
      paginationItems.push(
        activeItem === i ? 
            <div  key={i} className="active" onClick={()=>handlePagination(i)}>{i}</div> : 
            <div key={i} className="" onClick={()=>handlePagination(i)}>{i}</div>
      )
    }

    return (
     <section className="pagination-container">
        <div  onClick={()=>handlePaginationShift(true)}>{"<"}</div>
        {paginationItems.map(function (item, i) {
            return item;
        })}
        {activeItem < maxPages - 2 ? 
            <>
                <div>...</div>
                <div onClick={()=>handlePagination(maxPages)}>{maxPages}</div>
            </> : "" }
        <div onClick={()=>handlePaginationShift(false)}>{">"}</div>
     </section>
    )
}

export default Pagination
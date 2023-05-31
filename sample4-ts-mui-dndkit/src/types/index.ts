export type ItemProp={
    id:string;
    name:string;
}

export type ItemArrayProp={
    initialItems:ItemProp[],
   
}


export type ItemArrayProps={
    items:ItemProp[],
   
}

export type DraggableItemProps = {
  item: ItemProp;
};

export type CanvasItemProp={
    item:ItemProp,
    index:number,
    setDraggingItem:(item:ItemProp|null)=>void
}
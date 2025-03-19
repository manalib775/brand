
import { useState, Dispatch, SetStateAction } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";

export interface BrandTab {
  id: string;
  name: string;
}

interface BrandTabOrderProps {
  brandTabs: BrandTab[];
  onTabsUpdate: Dispatch<SetStateAction<BrandTab[]>>;
}

export function BrandTabOrder({ brandTabs, onTabsUpdate }: BrandTabOrderProps) {
  const handleTabReorder = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(brandTabs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onTabsUpdate(items);
  };

  return (
    <DragDropContext onDragEnd={handleTabReorder}>
      <Droppable droppableId="tabs">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {brandTabs.map((tab, index) => (
              <Draggable key={tab.id} draggableId={tab.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center justify-between p-3 border rounded-md bg-background"
                  >
                    <div className="flex items-center">
                      <ArrowUpDown className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{tab.name}</span>
                    </div>
                    <Badge variant="outline">{index + 1}</Badge>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

import { Table } from 'antd';
import React, { useRef } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import './DraggableTable.css';

/**
 * 드래그로 순서 변경이 가능한 테이블 컴포넌트
 *
 * @param {object} param
 */
export default function DraggableTable({ onMove, ...restProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        components={{
          body: {
            row: DraggableTableRow,
          },
        }}
        onRow={(_, index) => ({
          index,
          onMove,
        })}
        {...restProps}
      />
    </DndProvider>
  );
}

function DraggableTableRow({ index, onMove, className, style, ...restProps }) {
  const ref = useRef();
  const [, dragRef] = useDrag({
    item: { type: REACT_DND_ITEM_TYPE, index },
  });
  const [{ isOver, dropClassName }, dropRef] = useDrop({
    accept: REACT_DND_ITEM_TYPE,
    drop: item => {
      if (item.index === index) return;

      onMove(item.index, index);
    },
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};

      if (dragIndex === index) return {};

      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
  });

  dropRef(dragRef(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
}

const REACT_DND_ITEM_TYPE = 'draggableTableRow';

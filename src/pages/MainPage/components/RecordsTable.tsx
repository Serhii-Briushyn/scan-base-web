import { useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

import styles from "../MainPage.module.css";

import type { MaterialRecord } from "@shared/types/material";

type Props = {
  items: MaterialRecord[];
  onDelete: (id: string) => void;
  lastAddedId?: string | null;
};

export const RecordsTable: React.FC<Props> = ({
  items,
  onDelete,
  lastAddedId,
}) => {
  const lastRowRef = useRef<HTMLTableRowElement | null>(null);

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString("sk-SK", {
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    if (!lastAddedId) return;
    const t = setTimeout(() => {
      lastRowRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 0);
    return () => clearTimeout(t);
  }, [lastAddedId, items.length]);

  return (
    <div className={styles.table_wrap}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>#</th>
            <th>Kód položky</th>
            <th>Oceľ</th>
            <th>Spracovanie</th>
            <th>Priradeny nesting</th>
            <th>Hrúbka</th>
            <th>Šírka</th>
            <th>Dĺžka</th>
            <th>Čas</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {items.length === 0 ? (
            <tr key="empty">
              <td colSpan={10} className={styles.empty}>
                Žiadny záznam.
              </td>
            </tr>
          ) : (
            items.map((item, idx) => {
              const isLastAdded = item.id === lastAddedId;
              return (
                <tr
                  key={item.id}
                  ref={isLastAdded ? lastRowRef : undefined}
                  className={isLastAdded ? styles.just_added : undefined}
                >
                  <td>{idx + 1}</td>
                  <td>{item.material.materialId}</td>
                  <td>{item.material.steelGrade}</td>
                  <td>{item.material.treatmentCode}</td>
                  <td>{item.material.sourceNestingId ?? "—"}</td>
                  <td>{item.material.thickness}</td>
                  <td>{item.material.width}</td>
                  <td>{item.material.length}</td>
                  <td>{formatTime(item.createdAt)}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.btn_remove}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                    >
                      <FaXmark />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

import styles from "../style";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CardDeal from "./CardDeal";

function Items({ currentItems }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {currentItems &&
        currentItems.map((item, index) => (
          <img
            key={index}
            style={{ maxWidth: "25%", padding: 10, cursor: 'pointer' }}
            src={`assets/mpd/mpd-${item}.jpg`}
          />
        ))}
    </div>
  );
}

export default function Mpd() {
  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <CardDeal />
          <div>
            <Items currentItems={currentItems} />
            <ReactPaginate
              breakLabel="..."
              nextLabel="»"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="«"
              renderOnZeroPageCount={null}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const items = [
  "010",
  "011",
  "012",
  "013",
  "014",
  "015",
  "016",
  "017",
  "018",
  "019",
  "020",
  "021",
  "022",
  "023",
  "024",
  "025",
  "026",
  "027",
  "028",
  "029",
  "030",
  "031",
  "032",
  "033",
  "034",
  "035",
  "036",
  "037",
  "038",
  "039",
  "040",
  "041",
  "042",
  "043",
  "044",
  "045",
  "046",
  "047",
  "048",
  "049",
  "050",
  "051",
  "052",
  "053",
  "054",
  "055",
  "056",
  "057",
  "058",
  "059",
  "060",
  "061",
  "062",
  "063",
  "064",
  "065",
  "066",
  "067",
  "068",
  "069",
  "070",
  "071",
  "072",
  "073",
  "074",
  "075",
  "076",
  "077",
  "078",
  "079",
  "080",
  "081",
  "082",
  "083",
  "084",
  "085",
  "086",
  "087",
  "088",
  "089",
  "090",
  "091",
  "092",
  "093",
  "094",
  "095",
  "096",
  "097",
  "098",
  "099",
  "100",
  "101",
  "102",
  "103",
  "104",
  "105",
  "106",
  "107",
  "108",
  "109",
  "110",
  "111",
  "112",
  "113",
  "114",
  "115",
  "116",
  "117",
  "118",
  "119",
  "120",
  "121",
  "122",
  "123",
  "124",
  "125",
  "126",
  "127",
  "128",
  "129",
  "130",
  "131",
  "132",
  "133",
  "134",
  "135",
  "136",
  "137",
  "138",
  "139",
  "140",
  "141",
  "142",
  "143",
  "144",
  "145",
  "146",
  "147",
  "148",
  "149",
  "150",
  "151",
  "152",
  "153",
  "154",
  "155",
  "156",
  "157",
  "158",
  "159",
  "160",
  "161",
  "162",
  "163",
  "164",
  "165",
  "166",
  "167",
  "168",
  "169",
  "170",
  "171",
  "172",
  "173",
  "174",
  "175",
  "176",
  "177",
  "178",
  "179",
  "180",
  "181",
  "182",
  "183",
  "184",
  "185",
  "186",
  "187",
  "188",
  "189",
  "190",
  "191",
  "192",
  "193",
  "194",
  "195",
  "196",
  "197",
  "198",
  "199",
];

import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext";

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Filter = styled.div`
  width: 100%;
  height: 18vh;
  position: relative;
  z-index: 999;
`;

const IconFilter = styled.div`
  cursor: pointer;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  font-size: 20px;
  letter-spacing: 2px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  &:hover {
    background: rgb(240 0 47);
    color: white;
    border: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 0px 10px 0px 10px;
  display: flex;
`;

const Product = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5vh;
`;

const Name = styled.div`
  flex: 1;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Container = styled.div`
  flex: 2;
  margin: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: auto;
  width: 100%;
  z-index: 2;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    width: 40vw;
  }
`;

const IconInfo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const FilterContainer = styled.div`
  width: ${(prop) => (prop.open === false ? "0%" : "35%")};
  height: 170vh;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  @media (max-width: 1024px) {
    top: 0;
    left: 0;
    height: 100vh;
    width: ${(prop) => (prop.open === false ? "0%" : "100%")};
    z-index: 9999;
    position: fixed;
  }
  background: white;
`;

const CloseBtn = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 2%;
  right: 2%;
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const FilterItem = styled.div`
  padding-left: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: space-around;
`;

const FilterCategory = styled.div`
  width: 100%;
  height: 30%;
`;
const TitleCategory = styled.h4`
  width: 100%;
  height: 40px;
  border-left 3px solid black;
  display: flex;
  align-items: center;
  padding: 10px;
  position: relative;
  &::after {
      content: "";
      width: 60%;
      height: 1px;
      background-color: lightgray;
      position: absolute;
      right: 0%;
      top: 50%;
  }
`;

const ListFilter = styled.ul`
  list-style-type: none;
  margin-top: 20px;
`;
const ItemFilter = styled.li`
  font-size: 18px;
  font-weight: 400;
  font-family: Poppins;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
const ImageBanner = styled.img`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const PageChange = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.div`
  width: 50px;
  height: 50px;
  border: 0.5px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;

const ProductItem = () => {
  const { productState, findProduct } = useContext(ProductContext);
  const [filter, setFilter] = useState({
    cate: "All",
    min_price: null,
    max_price: null,
  });

  let products = productState.products;

  if (filter.cate === "Pizza") {
    products = products.filter(
      (item) => item.categories.indexOf("Pizza") !== -1
    );
  } else if (filter.cate === "Hamburger") {
    products = products.filter(
      (item) => item.categories.indexOf("Hamburger") !== -1
    );
  } else if (filter.cate === "French Fries") {
    products = products.filter(
      (item) => item.categories.indexOf("French Fries") !== -1
    );
  } else if (filter.cate === "Combo") {
    products = products.filter(
      (item) => item.categories.indexOf("Combo") !== -1
    );
  } else products = productState.products;

  if (filter.min_price !== null && filter.max_price !== null) {
    products = products.filter(
      (item) => item.price >= filter.min_price && item.price <= filter.max_price
    );
  }

  //Count how many page for product (12 items per page)
  const maxPage = Math.ceil(products.length / 12);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const movePage = (direct) => {
    if (direct === "next" && page <= maxPage) {
      let newPage = page;
      page === maxPage ? setPage(page) : setPage(++newPage);
    } else if (direct === "prev" && page !== 1) {
      let newPage = page;
      setPage(--newPage);
    } else {
      return;
    }
  };

  return (
    <div>
      <ProductContainer>
        <Filter style={{ zIndex: 10 }}>
          <IconFilter
            onClick={() => {
              setOpenFilter(!openFilter);
            }}
          >
            <FilterAltIcon /> FILTER
          </IconFilter>
        </Filter>
        <Wrapper>
          <FilterContainer open={openFilter}>
            <CloseBtn
              onClick={() => {
                setOpenFilter(!openFilter);
              }}
            >
              <CloseIcon></CloseIcon>
            </CloseBtn>
            <FilterItem>
              <FilterCategory>
                <TitleCategory>Categories</TitleCategory>
                <ListFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({ ...filter, cate: "All" });
                      setOpenFilter(false);
                    }}
                  >
                    All
                  </ItemFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({ ...filter, cate: "Pizza" });
                      setOpenFilter(false);
                    }}
                  >
                    Pizza
                  </ItemFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({ ...filter, cate: "Hamburger" });
                      setOpenFilter(false);
                    }}
                  >
                    Hamburger
                  </ItemFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({ ...filter, cate: "French Fries" });
                      setOpenFilter(false);
                    }}
                  >
                    French Fries
                  </ItemFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({ ...filter, cate: "Combo" });
                      setOpenFilter(false);
                    }}
                  >
                    Combo
                  </ItemFilter>
                </ListFilter>
              </FilterCategory>
              <FilterCategory>
                <TitleCategory>Price Filter</TitleCategory>
                <ListFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({
                        ...filter,
                        min_price: null,
                        max_price: null,
                      });
                      setOpenFilter(false);
                    }}
                  >
                    All
                  </ItemFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({ ...filter, min_price: 5, max_price: 10 });
                      setOpenFilter(false);
                    }}
                  >
                    $5-$10
                  </ItemFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({ ...filter, min_price: 10, max_price: 15 });
                      setOpenFilter(false);
                    }}
                  >
                    $10-$15
                  </ItemFilter>
                  <ItemFilter
                    onClick={() => {
                      setFilter({ ...filter, min_price: 15, max_price: 20 });
                      setOpenFilter(false);
                    }}
                  >
                    $15-$20
                  </ItemFilter>
                </ListFilter>
              </FilterCategory>
              <ImageBanner src="https://cdn.shopify.com/s/files/1/0414/0069/6999/files/sidebar_banner.jpg?v=1592968206"></ImageBanner>
            </FilterItem>
          </FilterContainer>
          <Grid container spacing={1}>
            {products.slice(page * 12 - 12, page * 12).map((item) => (
              <Grid item xs={6} md={3} key={item._id}>
                <Product>
                  <Container>
                    <Image src={item.img[0]} />
                    <Info>
                      <IconInfo>
                        <ShoppingCartOutlined />
                      </IconInfo>
                      <Link
                        to={`/product/${item._id}`}
                        style={{ textDecoration: "inherit", color: "inherit" }}
                      >
                        <IconInfo>
                          <SearchOutlined />
                        </IconInfo>
                      </Link>
                      <IconInfo>
                        <FavoriteBorderOutlined />
                      </IconInfo>
                    </Info>
                  </Container>
                  <Name>
                    <Link
                      to={`/product/${item._id}`}
                      style={{ textDecoration: "inherit", color: "inherit" }}
                    >
                      <h4
                        style={{
                          marginTop: "5px",
                          fontFamily: "Poppins",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          findProduct(item._id);
                        }}
                      >
                        {item.title}
                      </h4>
                    </Link>

                    <p style={{ color: "red", fontWeight: "600" }}>
                      $ {item.price.toFixed(2)}
                    </p>
                  </Name>
                </Product>
              </Grid>
            ))}
            <PageChange>
              <Btn
                onClick={() => {
                  movePage("prev");
                  window.scrollTo(0, 0);
                }}
              >
                {"<"}
              </Btn>
              {Array.apply(null, Array(maxPage))
                .map((x, i) => i)
                .map((item) => (
                  <Btn
                    key={item}
                    style={
                      page === item + 1
                        ? { background: "black", color: "white" }
                        : { background: "white" }
                    }
                    onClick={() => {
                      setPage(item + 1);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {item + 1}
                  </Btn>
                ))}
              <Btn
                onClick={() => {
                  movePage("next");
                  window.scrollTo(0, 0);
                }}
              >
                {">"}
              </Btn>
            </PageChange>
          </Grid>
        </Wrapper>
      </ProductContainer>
    </div>
  );
};

export default ProductItem;

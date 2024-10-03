<template>
  <div>
    <div id="header-wrapper">
      <div id="header-text">
        <h1>Knowledge base doesn't have to be boring</h1>
        <h3>Everything you need to manage your messaging</h3>
      </div>
      <div id="header-textfield">
        <input type="text" placeholder="Search for answers" name="search" />
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
    <div id="list-wrapper">
      <div v-if="isGetArticle" class="article-wrapper">
        <div id="category-breadcrumb">
          <p @click="goBack">All categories</p>
          <i class="fa fa-chevron-right"></i>
          <p>Getting started</p>
        </div>
        <div id="article-card-panel">
          <div id="article-card-left-panel">
            <i :class="'fa fa-' + category.icon"></i>
            <p>{{category.title}}</p>
            <p>Updated {{ calculateDiferenceDays(category.createdOn, category.updatedOn) }} ago</p>
            <hr>
            <i :class="'fa fa-info'"></i>
            <p>{{category.description}}</p>
          </div>
          <div id="article-card-right-panel">
            <div v-for="article in articles" :key="article.id">
              <div id="article-card" v-if="article.status='published'">
                <i :class="'fa fa-' + article.icon"></i>
                <div>
                  <p>{{article.title}}</p>
                  <p>Updated on {{article.updatedOn}}</p>
                </div>
                <i class="fa fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else id="list-categories">
        <span v-for="category in sortedCategories" :key="category.id">
          <div v-if="category.enabled" @click="getArticles(category.id)">
            <i :class="'fa fa-' + category.icon"></i>
            <p>{{category.title}}</p>
            <p>{{category.totalArticle}} articles</p>
            <p>Last update {{ calculateDiferenceDays(category.createdOn, category.updatedOn) }} ago</p>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "../services/apiService";

export default {
  data() {
    return {
      categories: [],
      category: {},
      articles: [],
      isGetArticle: false
    };
  },
  async mounted() {
    try {
      const response = await apiService.getCategories();
      this.categories = response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  methods: {
    calculateDiferenceDays(date1, date2) {
      let dt1 = new Date(date1);
      let dt2 = new Date(date2);
      let diff = "";

      let diffSecond = Math.floor((dt2 - dt1) / 1000);
      diff = diffSecond + " seconds";
      if (diffSecond > 60) {
        let diffMin = Math.floor(diffSecond / 60);
        diff = diffMin + " days";
      }

      return diff;
    },
    async getArticles(id) {
      this.isGetArticle = true;

      const response = await apiService.getCategoryById("cat1");

      this.articles = response.data;

      this.category = this.categories.find(category => category.id === id);
    },
    goBack() {
      this.isGetArticle = false;
    }
  },
  computed: {
    sortedCategories() {
      return this.categories.sort((a, b) => {
        return a.order - b.order;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

#header-wrapper {
  height: fit-content;
  padding-bottom: 20px;
}

#header-text {
  text-align: center;
  font-family: $font-family;
  color: $text-black;
  padding: 20px;

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
  }

  h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
  }
}

#header-textfield {
  display: flex;
  max-width: 40%;
  margin: auto;
  font-family: $font-family;
  color: $text-gray;

  input {
    padding: 20px;
    font-size: 17px;
    border: 1px solid $light-gray;
    float: left;
    width: 90%;
  }

  input::placeholder {
    color: $text-gray;
    font-size: 16px;
    line-height: 19.2px;
  }

  button {
    float: left;
    width: 10%;
    padding: 10px;
    background: $green;
    color: white;
    font-size: 20px;
    border: 1px solid $green;
    border-left: none;
    cursor: pointer;
  }
}

#list-wrapper {
  background: $second-light-gray;
  font-family: $font-family;
  padding: 3% 5%;
}

#list-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;

  span {
    flex: 0 0 25%;
    font-family: $font-family;
    background: white;
    padding: 40px;
    justify-content: center;
    align-items: center;
    align-content: center;
    text-align: center;
    border: 1px solid $light-gray;
    border-radius: 5px;

    i {
      font-size: 55px;
      color: $green;
    }

    p:nth-child(2) {
      font-size: 20px;
      line-height: 24px;
    }

    p:nth-child(3) {
      font-size: 13px;
      line-height: 15.6px;
      color: $green;
    }
    p:nth-child(4) {
      font-size: 11px;
      line-height: 13.2px;
      color: $text-gray;
    }
  }
}

#category-breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  p:nth-child(1) {
    margin: 0;
    font-size: 13px;
    line-height: 23px;
    color: #03a84e;
  }

  i {
    margin: 0 20px;
    color: #d3d3d3;
    font-size: 12px;
  }

  p:nth-child(3) {
    margin: 0;
    font-size: 13px;
    line-height: 23px;
    color: #9c9aa6;
  }
}

#article-card-panel {
  display: flex;
  justify-content: space-between;
  gap: 40px;

  div:nth-child(2) {
    width: 70%;

    div {
      width: 100%;
    }
  }
}

#article-card-left-panel {
  width: 30%;
  border: 1px solid $light-gray;
  background: white;
  border-radius: 5px;
  text-align: center;
  height: fit-content;
  padding: 30px 0;

  i:nth-child(1) {
    font-size: 55px;
    color: $green;
  }

  p:nth-child(2) {
    font-size: 23px;
    line-height: 27.6px;
    font-weight: 700;
    color: $text-black;
  }

  p:nth-child(3) {
    font-size: 11px;
    line-height: 22px;
    color: $text-gray;
    size: 1;
  }

  hr:nth-child(4) {
    border: 1px solid $light-gray;
    margin: 20px 0;
  }

  i:nth-child(5) {
    font-size: 15px;
    color: $green;
    margin-bottom: 20px;
  }

  p:nth-child(6) {
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    color: $text-black;
    margin: 0 20px;
  }
}

#article-card-right-panel {
  width: 70%;

  div {
    width: 100%;
  }
}

#article-card {
  display: flex;
  background: white;
  margin-bottom: 40px;
  align-items: center;
  padding: 30px;
  border-radius: 5px;
  border: 1px solid $light-gray;

  i:nth-child(1) {
    color: #03a84e;
    font-size: 28px;
    margin-right: 30px;
  }

  div {
    p:nth-child(3) {
      font-size: 20px;
      line-height: 24px;
      font-weight: 400;
      margin: 0;
    }

    p:nth-child(2) {
      font-size: 11px;
      line-height: 22px;
      font-weight: 400;
      color: #9c9aa6;
      margin: 0;
    }
  }

  i:nth-child(2) {
    float: right;
  }
}
</style>
/*<!necklaces[CDATA[*/
(function () {
      var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        } else {
          loadScript();
        }
      } else {
        loadScript();
      }

      function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
      }

      function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
          domain: 'emunah-channel.myshopify.com',
          apiKey: '3f930fdd39522658be669e2768e2ce36',
          appId: '6',
        });

        ShopifyBuy.UI.onReady(client).then(function (ui) {
          ui.createComponent('collection', {
            id: 440439253,
            node: document.getElementById('collection-component-5c081645c5b'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
      "product": {
        "buttonDestination": "modal",
        "variantId": "all",
        "contents": {
          "imgWithCarousel": false,
          "variantTitle": false,
          "options": false,
          "description": false,
          "buttonWithQuantity": false,
          "quantity": false
        },
        "text": {
          "button": "View Product"
        },
        "styles": {
          "product": {
            "@media (min-width: 601px)": {
              "max-width": "calc(25% - 20px)",
              "margin-left": "20px",
              "margin-bottom": "50px"
            }
          },
          "button": {
            "background-color": "#add8e6",
            ":hover": {
              "background-color": "#9cc2cf"
            },
            ":focus": {
              "background-color": "#9cc2cf"
            }
          }
        }
      },
      "cart": {
        "contents": {
          "button": true
        },
        "styles": {
          "button": {
            "background-color": "#add8e6",
            ":hover": {
              "background-color": "#9cc2cf"
            },
            ":focus": {
              "background-color": "#9cc2cf"
            }
          },
          "footer": {
            "background-color": "#ffffff"
          }
        }
      },
      "modalProduct": {
        "contents": {
          "img": false,
          "imgWithCarousel": true,
          "variantTitle": false,
          "buttonWithQuantity": true,
          "button": false,
          "quantity": false
        },
        "styles": {
          "product": {
            "@media (min-width: 601px)": {
              "max-width": "100%",
              "margin-left": "0px",
              "margin-bottom": "0px"
            }
          },
          "button": {
            "background-color": "#add8e6",
            ":hover": {
              "background-color": "#9cc2cf"
            },
            ":focus": {
              "background-color": "#9cc2cf"
            }
          }
        }
      },
      "toggle": {
        "styles": {
          "toggle": {
            "background-color": "#add8e6",
            ":hover": {
              "background-color": "#9cc2cf"
            },
            ":focus": {
              "background-color": "#9cc2cf"
            }
          }
        }
      },
      "productSet": {
        "styles": {
          "products": {
            "@media (min-width: 601px)": {
              "margin-left": "-20px"
            }
          }
        }
      }
    }
          });
        });
      }
    })();


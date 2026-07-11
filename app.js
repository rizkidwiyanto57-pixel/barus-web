const API_BASE =
"https://script.google.com/macros/s/AKfycbyTTv4-Wh--1U3szdDZKjl2IOTuMW52b-BDRVFQ7NJPXe5tc4NcAbSdXnTD7wGBHIeA/exec";

let brandChart = null;
let statusChart = null;
let departmentChart = null;
let agingChart = null;

/**
 * ==================================================
 * LOAD FILTER BRAND
 * ==================================================
 */
async function loadBrandFilter() {

  try {

    const response =
      await fetch(
        API_BASE +
        "?action=filters"
      );

    const data =
      await response.json();

    const select =
      document.getElementById(
        "brandFilter"
      );

    select.innerHTML =
      '<option value="">SEMUA BRAND</option>';

    data.brand.forEach(brand => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        brand;

      option.textContent =
        brand;

      select.appendChild(
        option
      );

    });

  }

  catch(error) {

    console.error(
      "Gagal load filter",
      error
    );

  }

}

/**
 * ==================================================
 * LOAD DASHBOARD
 * ==================================================
 */
async function loadDashboard(
  brand = ""
) {

  try {

    let url =
      API_BASE +
      "?action=dashboard";

    if (brand !== "") {

      url +=
        "&brand=" +
        encodeURIComponent(
          brand
        );

    }

    const response =
      await fetch(url);

    const data =
      await response.json();

    if (!data.success) {

      alert(
        "Gagal mengambil data"
      );

      return;

    }

    updateKPI(
      data.kpi
    );

    createBrandChart(
      data.brand
    );

    createStatusChart(
      data.status
    );

    createDepartmentChart(
      data.department
    );

    createAgingChart(
      data.aging
    );

    createArticleTable(
      data.article
    );

    createTop20Table(
      data.top20
    );

    document.getElementById(
      "lastUpdate"
    ).textContent =

      "Last Update : " +

      new Date(
        data.generatedAt
      ).toLocaleString(
        "id-ID"
      );

  }

  catch(error) {

    console.error(error);

    alert(
      "Gagal mengambil data dari BARUS API"
    );

  }

}

/**
 * ==================================================
 * FILTER BUTTON
 * ==================================================
 */
function applyFilter() {

  const brand =
    document.getElementById(
      "brandFilter"
    ).value;

  loadDashboard(
    brand
  );

}

/**
 * ==================================================
 * KPI
 * ==================================================
 */
function updateKPI(kpi) {

  document.getElementById(
    "openCase"
  ).textContent =

    kpi.openCase || 0;

  document.getElementById(
    "belumProgress"
  ).textContent =

    kpi.belumProgress || 0;

  document.getElementById(
    "doneEmail"
  ).textContent =

    kpi.doneEmail || 0;

  document.getElementById(
    "approveCase"
  ).textContent =

    kpi.approveCase || 0;

  document.getElementById(
    "clearCase"
  ).textContent =

    kpi.clearCase || 0;

}

/**
 * ==================================================
 * CASE BY BRAND
 * ==================================================
 */
function createBrandChart(
  rows
) {

  if (brandChart) {

    brandChart.destroy();

  }

  brandChart =
    new Chart(

      document.getElementById(
        "brandChart"
      ),

      {

        type: "bar",

        data: {

          labels:

            rows.map(
              x => x.label
            ),

          datasets: [

            {

              label:
                "Case",

              data:

                rows.map(
                  x => x.value
                )

            }

          ]

        },

        options: {

          responsive: true,

          maintainAspectRatio: false

        }

      }

    );

}

/**
 * ==================================================
 * STATUS
 * ==================================================
 */
function createStatusChart(
  rows
) {

  if (statusChart) {

    statusChart.destroy();

  }

  statusChart =
    new Chart(

      document.getElementById(
        "statusChart"
      ),

      {

        type: "pie",

        data: {

          labels:

            rows.map(
              x => x.label
            ),

          datasets: [

            {

              data:

                rows.map(
                  x => x.value
                )

            }

          ]

        }

      }

    );

}

/**
 * ==================================================
 * DEPARTMENT
 * ==================================================
 */
function createDepartmentChart(
  rows
) {

  if (departmentChart) {

    departmentChart.destroy();

  }

  departmentChart =
    new Chart(

      document.getElementById(
        "departmentChart"
      ),

      {

        type: "bar",

        data: {

          labels:

            rows.map(
              x => x.label
            ),

          datasets: [

            {

              label:
                "Case",

              data:

                rows.map(
                  x => x.value
                )

            }

          ]

        },

        options: {

          indexAxis: "y",

          responsive: true,

          maintainAspectRatio: false

        }

      }

    );

}

/**
 * ==================================================
 * AGING
 * ==================================================
 */
function createAgingChart(
  rows
) {

  if (agingChart) {

    agingChart.destroy();

  }

  agingChart =
    new Chart(

      document.getElementById(
        "agingChart"
      ),

      {

        type: "bar",

        data: {

          labels:

            rows.map(
              x => x.label
            ),

          datasets: [

            {

              label:
                "Case",

              data:

                rows.map(
                  x => x.value
                )

            }

          ]

        }

      }

    );

}

/**
 * ==================================================
 * ARTICLE TABLE
 * ==================================================
 */
function createArticleTable(
  rows
) {

  const tbody =
    document.querySelector(
      "#articleTable tbody"
    );

  tbody.innerHTML = "";

  rows.forEach(row => {

    const tr =
      document.createElement(
        "tr"
      );

    tr.innerHTML = `

    <td>${row[0]}</td>
    <td>${row[1]}</td>
    <td>${row[2]}</td>
    <td>${row[3]}</td>

   `;

    tbody.appendChild(
      tr
    );

  });

}

/**
 * ==================================================
 * TOP 20 TABLE
 * ==================================================
 */
function createTop20Table(
  rows
) {

  const tbody =
    document.querySelector(
      "#oldestTable tbody"
    );

  tbody.innerHTML = "";

  rows.forEach(row => {

    const tr =
      document.createElement(
        "tr"
      );

    tr.innerHTML = `

      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>

    `;

    tbody.appendChild(
      tr
    );

  });

}

/**
 * ==================================================
 * INITIALIZE
 * ==================================================
 */

loadBrandFilter();

loadDashboard();

/**
 * ==================================================
 * AUTO REFRESH
 * ==================================================
 */

setInterval(() => {

  const brand =

    document.getElementById(
      "brandFilter"
    ).value;

  loadDashboard(
    brand
  );

}, 300000);
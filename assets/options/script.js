const contracts = [
        { symbol: "ES", description: "E-mini S&P 500", last_price: 5200.0, tick_size: 0.25, tick_value: 12.5, provider: "static demo" },
        { symbol: "NQ", description: "E-mini Nasdaq-100", last_price: 18500.0, tick_size: 0.25, tick_value: 5.0, provider: "static demo" },
        { symbol: "YM", description: "E-mini Dow", last_price: 39000.0, tick_size: 1.0, tick_value: 5.0, provider: "static demo" },
        { symbol: "RTY", description: "E-mini Russell 2000", last_price: 2050.0, tick_size: 0.1, tick_value: 5.0, provider: "static demo" },
        { symbol: "EMD", description: "E-mini S&P MidCap 400", last_price: 2850.0, tick_size: 0.25, tick_value: 25.0, provider: "static demo" },
        { symbol: "MES", description: "Micro E-mini S&P 500", last_price: 5200.0, tick_size: 0.25, tick_value: 1.25, provider: "static demo" },
        { symbol: "MNQ", description: "Micro E-mini Nasdaq-100", last_price: 18500.0, tick_size: 0.25, tick_value: 0.5, provider: "static demo" },
        { symbol: "MYM", description: "Micro E-mini Dow", last_price: 39000.0, tick_size: 1.0, tick_value: 0.5, provider: "static demo" },
        { symbol: "M2K", description: "Micro E-mini Russell 2000", last_price: 2050.0, tick_size: 0.1, tick_value: 0.5, provider: "static demo" },
        { symbol: "ZB", description: "30Y T-Bond", last_price: 120.0, tick_size: 0.03125, tick_value: 31.25, provider: "static demo" },
        { symbol: "UB", description: "Ultra T-Bond", last_price: 125.0, tick_size: 0.03125, tick_value: 31.25, provider: "static demo" },
        { symbol: "ZN", description: "10Y T-Note", last_price: 110.0, tick_size: 0.015625, tick_value: 15.625, provider: "static demo" },
        { symbol: "ZF", description: "5Y T-Note", last_price: 107.0, tick_size: 0.0078125, tick_value: 7.8125, provider: "static demo" },
        { symbol: "ZT", description: "2Y T-Note", last_price: 104.0, tick_size: 0.0078125, tick_value: 7.8125, provider: "static demo" },
        { symbol: "GE", description: "Eurodollar", last_price: 95.0, tick_size: 0.0025, tick_value: 6.25, provider: "static demo" },
        { symbol: "SR3", description: "3M SOFR", last_price: 95.0, tick_size: 0.0025, tick_value: 6.25, provider: "static demo" },
        { symbol: "6E", description: "Euro FX", last_price: 1.08, tick_size: 0.00005, tick_value: 6.25, provider: "static demo" },
        { symbol: "6J", description: "Japanese Yen", last_price: 0.0068, tick_size: 0.0000005, tick_value: 6.25, provider: "static demo" },
        { symbol: "6B", description: "British Pound", last_price: 1.27, tick_size: 0.0001, tick_value: 6.25, provider: "static demo" },
        { symbol: "6C", description: "Canadian Dollar", last_price: 0.74, tick_size: 0.0001, tick_value: 10.0, provider: "static demo" },
        { symbol: "6A", description: "Australian Dollar", last_price: 0.66, tick_size: 0.0001, tick_value: 10.0, provider: "static demo" },
        { symbol: "6N", description: "New Zealand Dollar", last_price: 0.61, tick_size: 0.0001, tick_value: 10.0, provider: "static demo" },
        { symbol: "6S", description: "Swiss Franc", last_price: 1.12, tick_size: 0.0001, tick_value: 12.5, provider: "static demo" },
        { symbol: "6M", description: "Mexican Peso", last_price: 0.058, tick_size: 0.00001, tick_value: 5.0, provider: "static demo" },
        { symbol: "6Z", description: "South African Rand", last_price: 0.054, tick_size: 0.00001, tick_value: 5.0, provider: "static demo" },
        { symbol: "GC", description: "Gold", last_price: 2350.0, tick_size: 0.1, tick_value: 10.0, provider: "static demo" },
        { symbol: "SI", description: "Silver", last_price: 30.0, tick_size: 0.005, tick_value: 25.0, provider: "static demo" },
        { symbol: "HG", description: "Copper", last_price: 4.0, tick_size: 0.0005, tick_value: 12.5, provider: "static demo" },
        { symbol: "PL", description: "Platinum", last_price: 1000.0, tick_size: 0.1, tick_value: 5.0, provider: "static demo" },
        { symbol: "PA", description: "Palladium", last_price: 1000.0, tick_size: 0.1, tick_value: 10.0, provider: "static demo" },
        { symbol: "CL", description: "Crude Oil WTI", last_price: 78.25, tick_size: 0.01, tick_value: 10.0, provider: "static demo" },
        { symbol: "HO", description: "Heating Oil", last_price: 2.5, tick_size: 0.0001, tick_value: 4.2, provider: "static demo" },
        { symbol: "RB", description: "RBOB Gasoline", last_price: 2.2, tick_size: 0.0001, tick_value: 4.2, provider: "static demo" },
        { symbol: "NG", description: "Natural Gas", last_price: 2.8, tick_size: 0.001, tick_value: 10.0, provider: "static demo" },
        { symbol: "ZC", description: "Corn", last_price: 4.5, tick_size: 0.0025, tick_value: 12.5, provider: "static demo" },
        { symbol: "ZS", description: "Soybeans", last_price: 12.0, tick_size: 0.0025, tick_value: 12.5, provider: "static demo" },
        { symbol: "ZW", description: "Wheat", last_price: 6.0, tick_size: 0.0025, tick_value: 12.5, provider: "static demo" },
        { symbol: "ZO", description: "Oats", last_price: 3.6, tick_size: 0.0025, tick_value: 12.5, provider: "static demo" },
        { symbol: "ZL", description: "Soybean Oil", last_price: 0.45, tick_size: 0.0001, tick_value: 6.0, provider: "static demo" },
        { symbol: "ZM", description: "Soybean Meal", last_price: 350.0, tick_size: 0.1, tick_value: 10.0, provider: "static demo" },
        { symbol: "ZR", description: "Rough Rice", last_price: 17.0, tick_size: 0.005, tick_value: 10.0, provider: "static demo" },
        { symbol: "KE", description: "KC Wheat", last_price: 6.8, tick_size: 0.0025, tick_value: 12.5, provider: "static demo" },
        { symbol: "GF", description: "Feeder Cattle", last_price: 2.4, tick_size: 0.00025, tick_value: 12.5, provider: "static demo" },
        { symbol: "LE", description: "Live Cattle", last_price: 1.8, tick_size: 0.00025, tick_value: 10.0, provider: "static demo" },
        { symbol: "HE", description: "Lean Hogs", last_price: 0.9, tick_size: 0.00025, tick_value: 10.0, provider: "static demo" }
      ];

      function findContract(symbol) {
        return contracts.find((c) => c.symbol === symbol) || contracts[0];
      }

      function fmtUsd(value) {
        if (!Number.isFinite(value)) {
          return "$0.00";
        }
        return `$${value.toFixed(2)}`;
      }

      function fmtSignedUsd(value) {
        if (!Number.isFinite(value)) {
          return "—";
        }
        const sign = value >= 0 ? "+" : "-";
        return `${sign}$${Math.abs(value).toFixed(2)}`;
      }

      function formatQuotePrice(value) {
        if (!Number.isFinite(value)) {
          return "—";
        }
        const absValue = Math.abs(value);
        return absValue < 1 ? value.toFixed(4) : value.toFixed(1);
      }

      function fmtSignedNumber(value, decimals) {
        if (!Number.isFinite(value)) {
          return "—";
        }
        const sign = value >= 0 ? "+" : "-";
        return `${sign}${Math.abs(value).toFixed(decimals)}`;
      }

      function parsePrice(raw, tickSize) {
        const text = String(raw || "").trim();
        if (!text) return NaN;
        const direct = Number(text);
        if (Number.isFinite(direct)) return direct;

        if (!text.includes("'")) return NaN;
        const parts = text.split("'");
        if (parts.length !== 2) return NaN;

        const whole = Number(parts[0]);
        if (!Number.isFinite(whole)) return NaN;

        let fracText = parts[1].trim();
        let plus = false;
        if (fracText.endsWith("+")) {
          plus = true;
          fracText = fracText.slice(0, -1);
        }
        const frac = Number(fracText);
        if (!Number.isFinite(frac)) return NaN;

        const invTick = tickSize > 0 ? 1 / tickSize : NaN;
        const denom =
          Number.isFinite(invTick) && Math.abs(invTick - Math.round(invTick)) < 1e-6
            ? Math.round(invTick)
            : 32;
        const units = frac + (plus ? 0.5 : 0);
        return whole + units / denom;
      }

      function setSignedValue(el, value, formatter) {
        if (!el) return;
        el.classList.remove("positive", "negative");
        if (!Number.isFinite(value)) {
          el.textContent = "—";
          return;
        }
        if (value > 0) {
          el.classList.add("positive");
        } else if (value < 0) {
          el.classList.add("negative");
        }
        el.textContent = formatter ? formatter(value) : String(value);
      }

      function updateContractDetails(symbol) {
        const contract = findContract(symbol);
        const tickInfo = document.getElementById("tick-info");
        const currentInput = document.getElementById("current-price");
        const entryInput = document.getElementById("entry-price");
        const expectedInput = document.getElementById("expected-price");
        if (!contract) return;
        if (tickInfo) {
          tickInfo.textContent = `${contract.tick_size} price tick | ${fmtUsd(contract.tick_value)} per tick`;
        }
        if (currentInput) {
          const sameSymbol = currentInput.dataset.symbol === contract.symbol;
          if (!sameSymbol || currentInput.dataset.userEdited !== "true") {
            currentInput.value = formatQuotePrice(contract.last_price);
            currentInput.dataset.userEdited = "false";
          }
          currentInput.dataset.symbol = contract.symbol;
        }
        if (entryInput && entryInput.dataset.symbol !== contract.symbol) {
          entryInput.value = formatQuotePrice(contract.last_price);
          entryInput.dataset.symbol = contract.symbol;
        }
        if (expectedInput && expectedInput.dataset.symbol !== contract.symbol) {
          expectedInput.value = "";
          expectedInput.dataset.symbol = contract.symbol;
        }
      }

      function renderContracts() {
        const rows = document.querySelectorAll("tr[data-contract-row]");
        rows.forEach((row) => {
          const symbol = row.getAttribute("data-contract-row");
          const contract = findContract(symbol);
          if (!contract) return;
          row.querySelector("[data-last-price]").textContent = formatQuotePrice(contract.last_price);
          row.querySelector("[data-tick-size]").textContent = contract.tick_size;
          row.querySelector("[data-tick-value]").textContent = fmtUsd(contract.tick_value);
          row.querySelector("[data-provider]").textContent = contract.provider;
        });
      }

      function compute() {
        const currentInput = document.getElementById("current-price");
        const entryInput = document.getElementById("entry-price");
        const expectedInput = document.getElementById("expected-price");
        const contractsInput = document.getElementById("contracts");
        const contractSelect = document.getElementById("contract");

        if (!entryInput || !contractsInput || !contractSelect) return;

        const contract = findContract(contractSelect.value);
        const tickSize = contract ? contract.tick_size : 1;
        const currentRaw = currentInput ? currentInput.value : "";
        const currentParsed = parsePrice(currentRaw, tickSize);
        const defaultCurrent = contract ? contract.last_price : 0;
        const currentPrice = Number.isFinite(currentParsed) ? currentParsed : defaultCurrent;
        const entryParsed = parsePrice(entryInput.value, tickSize);
        const expectedParsed = expectedInput ? parsePrice(expectedInput.value, tickSize) : NaN;
        const entryPrice = Number.isFinite(entryParsed) ? entryParsed : currentPrice;
        const hasExpected = Number.isFinite(expectedParsed);
        const expectedPrice = hasExpected ? expectedParsed : currentPrice;
        const tickValue = contract ? contract.tick_value : 1;
        const contractCount = Math.max(0, parseInt(contractsInput.value || "0", 10));

        const currentDiff = currentPrice - entryPrice;
        const currentTicks = tickSize > 0 ? currentDiff / tickSize : 0;
        const currentPerContract = currentTicks * tickValue;
        const currentTotal = currentPerContract * contractCount;

        let expectedTotal = NaN;
        if (hasExpected) {
          const expectedDiff = expectedPrice - entryPrice;
          const expectedTicks = tickSize > 0 ? expectedDiff / tickSize : 0;
          const expectedPerContract = expectedTicks * tickValue;
          expectedTotal = expectedPerContract * contractCount;
        }

        const priceDiffEl = document.getElementById("price-diff");
        const ticksEl = document.getElementById("ticks");
        const pnlPerEl = document.getElementById("pnl-per");
        const currentPnlEl = document.getElementById("current-pnl");
        const expectedPnlEl = document.getElementById("expected-pnl");

        setSignedValue(priceDiffEl, currentDiff, (v) => fmtSignedNumber(v, 4));
        setSignedValue(ticksEl, currentTicks, (v) => fmtSignedNumber(v, 2));
        setSignedValue(pnlPerEl, currentPerContract, fmtSignedUsd);
        setSignedValue(currentPnlEl, currentTotal, fmtSignedUsd);
        if (hasExpected) {
          setSignedValue(expectedPnlEl, expectedTotal, fmtSignedUsd);
        } else if (expectedPnlEl) {
          expectedPnlEl.classList.remove("positive", "negative");
          expectedPnlEl.textContent = "—";
        }
        updateContractDetails(contractSelect.value);
      }

      function buildOptions() {
        const select = document.getElementById("contract");
        if (!select) return;
        select.innerHTML = "";
        contracts.forEach((contract, index) => {
          const option = document.createElement("option");
          option.value = contract.symbol;
          option.textContent = `${contract.symbol} - ${contract.description}`;
          if (index === 0) {
            option.selected = true;
          }
          select.appendChild(option);
        });
      }

      function buildTable() {
        const tbody = document.getElementById("contract-rows");
        if (!tbody) return;
        tbody.innerHTML = "";
        contracts.forEach((contract) => {
          const tr = document.createElement("tr");
          tr.setAttribute("data-contract-row", contract.symbol);

          const symbolTd = document.createElement("td");
          const stack = document.createElement("div");
          stack.style.display = "flex";
          stack.style.flexDirection = "column";
          const symbolSpan = document.createElement("span");
          symbolSpan.style.fontWeight = "600";
          symbolSpan.textContent = contract.symbol;
          const descSpan = document.createElement("span");
          descSpan.style.fontSize = "13px";
          descSpan.style.color = "#bbb";
          descSpan.textContent = contract.description;
          stack.appendChild(symbolSpan);
          stack.appendChild(descSpan);
          symbolTd.appendChild(stack);

          const priceTd = document.createElement("td");
          priceTd.setAttribute("data-last-price", "");
          const tickSizeTd = document.createElement("td");
          tickSizeTd.setAttribute("data-tick-size", "");
          const tickValueTd = document.createElement("td");
          tickValueTd.setAttribute("data-tick-value", "");
          const providerTd = document.createElement("td");
          providerTd.setAttribute("data-provider", "");

          tr.appendChild(symbolTd);
          tr.appendChild(priceTd);
          tr.appendChild(tickSizeTd);
          tr.appendChild(tickValueTd);
          tr.appendChild(providerTd);
          tbody.appendChild(tr);
        });
      }

      function wireUi() {
        buildOptions();
        buildTable();
        const inputs = [
          "current-price",
          "entry-price",
          "expected-price",
          "contracts",
          "contract"
        ].map((id) => document.getElementById(id));
        inputs.forEach((input) => {
          if (!input) return;
          input.addEventListener("input", compute);
          input.addEventListener("change", compute);
          input.addEventListener("keyup", compute);
        });
        const currentInput = document.getElementById("current-price");
        if (currentInput) {
          const markEdited = () => {
            currentInput.dataset.userEdited = "true";
          };
          currentInput.addEventListener("input", markEdited);
          currentInput.addEventListener("change", markEdited);
        }
        const calcButton = document.getElementById("calculate");
        if (calcButton) {
          calcButton.addEventListener("click", compute);
        }
        renderContracts();
        updateContractDetails(contracts[0].symbol);
        compute();
      }

      window.compute = compute;
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", wireUi);
      } else {
        wireUi();
      }

import React, { useState, useEffect } from "react";
import { useFintoc } from "./Fintoc";
//import { useFintoc } from "./Fintoc"; // Make sure the path is correct

const FintocWidget = () => {
  const [Fintoc, loadingFintoc, errorFintoc] = useFintoc();
  const [widget, setWidget] = useState(null);
  const [showHolderTypeSelector, setShowHolderTypeSelector] = useState(false);
  const [confirmSelection, setConfirmSelection] = useState(false);
  const [widgetOpened, setWidgetOpened] = useState(false);
  const [holderType, setHolderType] = useState("individual");

  useEffect(() => {
    if (confirmSelection && Fintoc && !loadingFintoc && !errorFintoc) {
      // Destroy existing widget instance if it exists
      if (widget) {
        widget.destroy();
      }

      // Assuming Fintoc is loaded and available here
      const newWidget = Fintoc.create({
        /* publicKey: "pk_test_ttgBZosqHuicgdo4Kwfmz1jLkqZTSNS1", */
        publicKey: "pk_live_T3X7SBt83bTqSxKqHvm139LiPwc9dSx9",
        holderType,
        product: "movements",
        webhookUrl:
          "https://appify-black-side.vercel.app/conciliacion/createCon",
        /* webhookUrl: "https://webhook.site/bc3f21b8-c6d6-448b-9504-19b2881f1ebf", */
        /* webhookUrl: "https://webhook.site/4be52339-ecdc-4b50-947c-ea331ce6452a", */
        onSuccess: (link) => {
          console.log("Success!");
          console.log(link);
        },
        onExit: () => {
          console.log("Widget closing!");
          setWidgetOpened(false);
          setShowHolderTypeSelector(false);
          setConfirmSelection(false);
        },
        onEvent: (event) => {
          console.log("An event just happened!");
          console.log(event);
        },
      });

      // Set the new widget instance
      setWidget(newWidget);

      // Open the widget
      newWidget.open();
    }
  }, [confirmSelection, Fintoc, loadingFintoc, errorFintoc, holderType]);

  const handleInitialButtonClick = () => {
    setShowHolderTypeSelector(true);
  };

  const handleConfirmButtonClick = () => {
    setConfirmSelection(true);
    setWidgetOpened(true); // Move opening the widget to this stage
  };

  if (loadingFintoc) return <div>Loading...</div>;
  if (errorFintoc) return <div>Error: {errorFintoc.message}</div>;

  return (
    <div>
      {!showHolderTypeSelector && !widgetOpened && (
        <button
          onClick={handleInitialButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Open Fintoc Widget
        </button>
      )}
      {showHolderTypeSelector && !confirmSelection && (
        <div className="mt-4">
          <label
            htmlFor="holderType"
            className="block text-sm font-medium text-gray-700"
          >
            Select holder Type:
          </label>
          <select
            id="holderType"
            onChange={(e) => setHolderType(e.target.value)}
            value={holderType}
            className="mt-1 block w-50% pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="individual"> Individual</option>
            <option value="business"> Business</option>
          </select>
          <button
            onClick={handleConfirmButtonClick}
            className="mt-4 bg-blue-500 hover:bg-grey-700 text-black font-bold py-2 px-4 rounded"
          >
            Confirm Selection
          </button>
        </div>
      )}
      {widgetOpened && <div>Fintoc widget is ready.</div>}
    </div>
  );
};

export default FintocWidget;

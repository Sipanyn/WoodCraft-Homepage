  <section className="shadow-lg rounded-xl p-5 flex flex-col gap-4 bg-white dark:bg-zinc-900">
            <h2
              className={`font-semibold text-lg ${isFa ? "text-right" : "text-left"} text-black dark:text-white`}
            >
              {t("summary.orderSummary")}
            </h2>

            <div className="flex flex-col gap-1.5 cursor-pointer divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  className="flex items-center gap-3 py-4 px-1  transition-colors"
                  dir={isFa ? "rtl" : "ltr"}
                >
                  <motion.img
                    src={item.img}
                    alt={item.nameKey}
                    className="w-16 h-16 rounded-lg object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.25 }}
                  />

                  <div className="flex flex-col flex-1">
                    <p className="text-sm font-medium line-clamp-2 text-gray-800 dark:text-gray-200">
                      {t(`summary.${item.nameKey}`)}
                    </p>

                    {/* price whit and without discount */}
                    <span className="flex flex-col items-start justify-start text-gray-700 dark:text-gray-300 mt-1">
                      {item.discount > 0 ? (
                        <>
                          {/* OLD PRICE */}
                          <p className="text-xs line-through text-gray-400 dark:text-gray-500">
                            {isFa
                              ? englishToPersianNumber(
                                  item.price.toLocaleString(),
                                )
                              : item.price.toLocaleString()}{" "}
                            {t("summary.unit")}
                          </p>

                          {/* FINAL PRICE */}
                          <p className="text-sm text-black dark:text-white font-medium">
                            {isFa
                              ? englishToPersianNumber(
                                  (
                                    item.price -
                                    (item.price * item.discount) / 100
                                  ).toLocaleString(),
                                )
                              : (
                                  item.price -
                                  (item.price * item.discount) / 100
                                ).toLocaleString()}{" "}
                            {t("summary.unit")}
                          </p>
                        </>
                      ) : (
                        <p className="text-xl text-black dark:text-white">
                          {isFa
                            ? englishToPersianNumber(
                                item.price.toLocaleString(),
                              )
                            : item.price.toLocaleString()}{" "}
                          {t("summary.unit")}
                        </p>
                      )}
                    </span>

                    <div className="flex justify-between items-center mt-3">
                      {/* increment & decrement */}
                      <div
                        className={`flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden ${isFa ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <button
                          className="px-2 py-1 text-red-500 hover:bg-gray-100 dark:hover:bg-neutral-700 transition cursor-pointer"
                          onClick={() => decrement(item.id)}
                        >
                          {item.quantity == 1 ? (
                            <i
                              onClick={() => setDeleteId(item.id)}
                              className="bi bi-trash"
                            ></i>
                          ) : (
                            "-"
                          )}
                        </button>

                        <span className="px-2 text-sm text-gray-800 dark:text-gray-200">
                          {isFa
                            ? englishToPersianNumber(item.quantity)
                            : item.quantity}
                        </span>

                        <button
                          className="px-2 py-1 text-green-500 hover:bg-gray-100 dark:hover:bg-neutral-700 transition cursor-pointer"
                          onClick={() => increment(item.id)}
                        >
                          +
                        </button>
                      </div>

                      {/* totoal for each item */}
                      <p className="text-sm font-semibold whitespace-nowrap text-gray-800 dark:text-gray-100">
                        {isFa
                          ? englishToPersianNumber(
                              (item.discount > 0
                                ? (item.price -
                                    (item.price * item.discount) / 100) *
                                  item.quantity
                                : item.price * item.quantity
                              ).toLocaleString(),
                            )
                          : (item.discount > 0
                              ? (item.price -
                                  (item.price * item.discount) / 100) *
                                item.quantity
                              : item.price * item.quantity
                            ).toLocaleString()}

                        {t("summary.unit")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* item remove confirm dialog */}
              <ConfirmDialog
                open={deleteId !== null}
                onOpenChange={(open) => !open && setDeleteId(null)}
                description={t("confirmDialog.removeItemConfirmMsg")}
                confirmText={t("confirmDialog.yesDelete")}
                cancelText={t("confirmDialog.cancel")}
                onConfirm={() => {
                  if (deleteId) removeItem(deleteId);
                }}
                variant="trash"
              />
            </div>
          </section>
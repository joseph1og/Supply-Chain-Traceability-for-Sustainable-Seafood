;; Vessel Registration Contract
;; Records details of fishing vessels and their operations

(define-data-var last-vessel-id uint u0)

(define-map vessels
  { vessel-id: uint }
  {
    name: (string-utf8 100),
    owner: principal,
    registration-date: uint,
    is-active: bool
  }
)

;; Read-only function to get vessel details
(define-read-only (get-vessel (vessel-id uint))
  (map-get? vessels { vessel-id: vessel-id })
)

;; Read-only function to get the total number of vessels
(define-read-only (get-vessel-count)
  (var-get last-vessel-id)
)

;; Public function to register a new vessel
(define-public (register-vessel (name (string-utf8 100)))
  (let
    (
      (new-id (+ (var-get last-vessel-id) u1))
    )
    (map-set vessels
      { vessel-id: new-id }
      {
        name: name,
        owner: tx-sender,
        registration-date: block-height,
        is-active: true
      }
    )
    (var-set last-vessel-id new-id)
    (ok new-id)
  )
)

;; Public function to update vessel status
(define-public (update-vessel-status (vessel-id uint) (is-active bool))
  (let ((vessel (unwrap! (get-vessel vessel-id) (err u404))))
    (asserts! (is-eq (get owner vessel) tx-sender) (err u403))
    (map-set vessels
      { vessel-id: vessel-id }
      (merge vessel { is-active: is-active })
    )
    (ok true)
  )
)

;; Public function to transfer vessel ownership
(define-public (transfer-vessel (vessel-id uint) (new-owner principal))
  (let ((vessel (unwrap! (get-vessel vessel-id) (err u404))))
    (asserts! (is-eq (get owner vessel) tx-sender) (err u403))
    (map-set vessels
      { vessel-id: vessel-id }
      (merge vessel { owner: new-owner })
    )
    (ok true)
  )
)

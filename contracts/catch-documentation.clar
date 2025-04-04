;; Catch Documentation Contract
;; Tracks species, quantities, and locations of catches

(define-data-var last-catch-id uint u0)

(define-map catches
  { catch-id: uint }
  {
    vessel-id: uint,
    species: (string-utf8 100),
    quantity: uint,
    location-lat: int,
    location-long: int,
    catch-date: uint,
    verified: bool,
    vessel-owner: principal
  }
)

;; Read-only function to get catch details
(define-read-only (get-catch (catch-id uint))
  (map-get? catches { catch-id: catch-id })
)

;; Read-only function to get the total number of catches
(define-read-only (get-catch-count)
  (var-get last-catch-id)
)

;; Public function to record a new catch
(define-public (record-catch
    (vessel-id uint)
    (species (string-utf8 100))
    (quantity uint)
    (location-lat int)
    (location-long int))
  (let
    (
      (new-id (+ (var-get last-catch-id) u1))
    )
    (map-set catches
      { catch-id: new-id }
      {
        vessel-id: vessel-id,
        species: species,
        quantity: quantity,
        location-lat: location-lat,
        location-long: location-long,
        catch-date: block-height,
        verified: false,
        vessel-owner: tx-sender
      }
    )
    (var-set last-catch-id new-id)
    (ok new-id)
  )
)

;; Public function to verify a catch
(define-public (verify-catch (catch-id uint))
  (let ((catch-data (unwrap! (get-catch catch-id) (err u404))))
    ;; In a real implementation, we would check if the sender is a certifier
    ;; For simplicity, we'll allow any verification for now
    (map-set catches
      { catch-id: catch-id }
      (merge catch-data { verified: true })
    )
    (ok true)
  )
)
